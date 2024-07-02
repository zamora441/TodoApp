using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.DTOs.AuthDTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        [Required]
        [Compare("Password", ErrorMessage = "Password and confirmation password don't match.") ]
        public string ConfirmPassword { get; set; } = null!;
        [Required]
        public string ClienteConfirmationEmailUrl { get; set; } = null!;
    }
}
