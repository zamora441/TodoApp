using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.DTOs.AuthDTOs
{
    public class ConfirmationEmailDto
    {
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        public string ConfirmationEmailToken { get; set; } = null!;
    }
}
