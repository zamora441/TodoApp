using FluentResults;
using System.IdentityModel.Tokens.Jwt;
using TodoApp.Server.DTOs.AuthDTOs;

namespace TodoApp.Server.Services
{
    public interface IAuthService
    {
        Task<Result> RegisterAsync(RegisterDto registerDto);
        Task<Result<AuthResponseDto>> LoginAsync(LoginDto loginDto);
        Task<Result<AuthResponseDto>> ConfirmEmailAsync(ConfirmationEmailDto confirmationEmailDto);
        Task<Result> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto);
        Task<Result> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
        void LogOut(JwtSecurityToken jwtSecurityToken);
        Task<Result> ChangePasswordAsync(ChangePasswordDto changePasswordDto, string currentEmailUser);
    }
}
