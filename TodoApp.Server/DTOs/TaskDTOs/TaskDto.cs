namespace TodoApp.Server.DTOs.TaskDTOs
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public bool IsComplete { get; set; }
    }
}
