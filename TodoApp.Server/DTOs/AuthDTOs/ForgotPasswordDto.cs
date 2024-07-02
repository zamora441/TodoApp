using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.DTOs.AuthDTOs
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string ClientResetPasswordUrl { get; set; } = null!;
    }
}
