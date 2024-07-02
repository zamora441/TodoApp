using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.DTOs.AuthDTOs
{
    public class ResetPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        [Required]
        [Compare("Password", ErrorMessage = "Password and confirmation password don't match.")]
        public string ConfirmPassword { get; set; } = null!;
        [Required]
        public string PasswordChangeToken { get; set; } = null!;
    }
}
