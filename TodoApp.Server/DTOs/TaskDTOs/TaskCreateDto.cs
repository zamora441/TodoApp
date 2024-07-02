using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.DTOs.TaskDTOs
{
    public class TaskCreateDto
    {
        [Required]
        public string Description { get; set; } = null!;

    }
}
