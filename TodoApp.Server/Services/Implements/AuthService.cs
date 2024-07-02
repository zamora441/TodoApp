using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoApp.Server.Data.Entities;
using TodoApp.Server.DTOs;
using TodoApp.Server.DTOs.AuthDTOs;
using TodoApp.Server.Errors;
using TodoApp.Server.Helpers;
using TodoApp.Server.Profiles;

namespace TodoApp.Server.Services.Implements
{
    public sealed class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IJwtTokenLifetimeManagerService _jwtTokenLifetimeManagerService;

        public AuthService(UserManager<User> userManager, IEmailService emailService, IConfiguration configuration, IJwtTokenLifetimeManagerService jwtTokenLifetimeManagerService)
        {
            this._userManager = userManager;
            this._emailService = emailService;
            this._configuration = configuration;
            this._jwtTokenLifetimeManagerService = jwtTokenLifetimeManagerService;
        }

        public async Task<Result<AuthResponseDto>> ConfirmEmailAsync(ConfirmationEmailDto confirmationEmailDto)
        {
            var user = await _userManager.FindByEmailAsync(confirmationEmailDto.Email);
            if(user is null){
                return new NotFoundError("There isn't any registered user with this email.");
            };

            var result = await _userManager.ConfirmEmailAsync(user, confirmationEmailDto.ConfirmationEmailToken);
            if (!result.Succeeded)
            {
                return new BadRequestError("The email confirmation token ins't valid.");
            }

            var authToken = CreateAuthenticationToken(user);
            var authResponseDto = new AuthResponseDto() { AuthToken = authToken };

            return Result.Ok(authResponseDto);
        }

        public async Task<Result> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if(user is null)
            {
                return Result.Ok();
            }

            var resetPasswordLink = await CreateResetPasswordLinkAsync(user, forgotPasswordDto.ClientResetPasswordUrl);
            var messageBody = AuthMessagesHelper.ResetPasswordMessage(resetPasswordLink);
            var emailMessageDto = new EmailMessageDto(forgotPasswordDto.Email, "Reset password.", messageBody);

            await _emailService.SendEmailAsync(emailMessageDto);

            return Result.Ok();
        }

        public async Task<Result<AuthResponseDto>> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user is null)
            {
                return new BadRequestError("Invalid email or password");
            }
            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return new UnauthorizedError("The email has not been confirm yet.");
            }
            if (await _userManager.IsLockedOutAsync(user))
            {
                return new UnauthorizedError("Your account has been locked due to multiplye login attempts");
            }else
            {
                if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                {
                    var isBlocked = await HandleFailedLoginAttemp(user, loginDto.ClientResetPasswordUrl);
                    if (isBlocked)
                    {
                        return new UnauthorizedError("Your account has been locked due to multiplye login attempts");
                    }
                    return new UnauthorizedError("Invalid email or password");
                }

            }

            await _userManager.ResetAccessFailedCountAsync(user);

            var authToken = CreateAuthenticationToken(user);
            var autheResponseDto = new AuthResponseDto() { AuthToken = authToken };

            return Result.Ok(autheResponseDto);
        }

        public async Task<Result> RegisterAsync(RegisterDto registerDto)
        {
            var newUser = registerDto.ToUser();
            var result = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Where(error => error.Code != "DuplicateUserName").Select(e=>e.Description);
                return new BadRequestError(string.Join(" ", errors));
            }
            
            var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            var urlParams = new Dictionary<string, string?>
            {
                {"confirmationToken", confirmEmailToken},
                {"email", newUser.Email }
            };
            var confirmEmailUrl = QueryHelpers.AddQueryString(registerDto.ClienteConfirmationEmailUrl, urlParams);

            var emailMessageDto = new EmailMessageDto(newUser.Email, "Confirm Email TodoApp.", AuthMessagesHelper.ConfirmationEmail(confirmEmailUrl));
            await _emailService.SendEmailAsync(emailMessageDto);
            
            return Result.Ok();
        }

        public async Task<Result> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if(user is null)
            {
                return new BadRequestError("There isn't any registered user with this email.");
            }
            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.PasswordChangeToken, resetPasswordDto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return new BadRequestError(string.Join(" ", errors));
            }

            await _userManager.SetLockoutEndDateAsync(user, new DateTime(2000, 1, 1));
            await _userManager.ResetAccessFailedCountAsync(user);

            var emailMessageDto = new EmailMessageDto(user.Email, "Change of password.", "You password has been changed");
            await _emailService.SendEmailAsync(emailMessageDto);

            return Result.Ok();
        }

        private string CreateAuthenticationToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("UserEmail", user.Email),
                new Claim("UserId", user.Id)
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["KeyJWT"]));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        private async Task<bool> HandleFailedLoginAttemp(User user, string clientResetPasswordUrl)
        {
            await _userManager.AccessFailedAsync(user);
            if(await _userManager.IsLockedOutAsync(user))
            {
                var resetPasswordLink = await CreateResetPasswordLinkAsync(user, clientResetPasswordUrl);
                var emailBody = AuthMessagesHelper.BlockAccount(resetPasswordLink);
                var emailMessageDto = new EmailMessageDto(user.Email, "Account locked.", emailBody);
                await _emailService.SendEmailAsync(emailMessageDto);
                return true;
            }

            return false;

        }

        private async Task<string> CreateResetPasswordLinkAsync(User user, string clientResetPasswordUrl)
        {
            var resetPasswordToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var urlParams = new Dictionary<string, string?>
            {
                { "token", resetPasswordToken },
                { "email", user.Email }
            };
            var resetPasswordLink = QueryHelpers.AddQueryString(clientResetPasswordUrl, urlParams);

            return resetPasswordLink;
        }

        public void LogOut(JwtSecurityToken jwtSecurityToken)
        {
            _jwtTokenLifetimeManagerService.RevokeToken(jwtSecurityToken); 
        }

        public async Task<Result> ChangePasswordAsync(ChangePasswordDto changePasswordDto, string currentEmailUser)
        {
            var user = await _userManager.FindByEmailAsync(currentEmailUser);
            if (user is null)
            {
                return new NotFoundError("There isn't any registered user with this email.");
            }

            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(error => error.Description);
                return new BadRequestError(string.Join(",", errors));
            }

            return Result.Ok();
        }
    }
}
