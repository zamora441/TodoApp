using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TodoApp.Server.DTOs.AuthDTOs;
using TodoApp.Server.Services;

namespace TodoApp.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) {
            this._authService = authService;
        }

        [HttpPost("register" ,Name ="Register")]
        public async Task<ActionResult<Result>> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                var errorMessage = error.Message;
                return StatusCode(statusCode, errorMessage);
            }

            return NoContent();
        }

        [HttpPost("login",Name = "Login")]
        public async Task<ActionResult<Result<AuthResponseDto>>> Login([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return Ok(result.Value);
        }

        [Authorize]
        [HttpPost("logout", Name ="LogOut")]
        public ActionResult LogOut()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            Console.WriteLine("/////////////////////////////////////");
            Console.WriteLine(token);
            _authService.LogOut(new JwtSecurityToken(token));

            return NoContent();
        }

        [HttpPost("confirmEmail", Name = "ConfirmEmail")]
        public async Task<ActionResult<Result<AuthResponseDto>>> ConfirmEmail([FromBody] ConfirmationEmailDto confirmationEmailDto)
        {
            var result = await _authService.ConfirmEmailAsync(confirmationEmailDto);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return Ok(result.Value);
        }

        [HttpPost("forgotPassword",Name = "ForgotPassword")]
        public async Task<ActionResult<Result>> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var result = await _authService.ForgotPasswordAsync(forgotPasswordDto);
            return NoContent();
        }

        [HttpPost("resetPassword",Name = "ResetPassword")]
        public async Task<ActionResult<Result>> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var result = await _authService.ResetPasswordAsync(resetPasswordDto);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return NoContent();
        }

        [Authorize]
        [HttpPatch("changePassword", Name ="ChangePassword")]
        public async Task<ActionResult<Result>> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var currentEmailUser = User.FindFirstValue("UserEmail");
            var result = await _authService.ChangePasswordAsync(changePasswordDto, currentEmailUser);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return NoContent();
        }

    }
}
