using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.Data.Entities
{
    public class Task : BaseEntity
    {
        [Required]
        public string Description { get; set; } = null!;
        public bool IsComplete { get; set; } = false;
        [Required]
        public string UserId { get; set; } = null!;
    }
}
