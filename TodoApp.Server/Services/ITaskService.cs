using FluentResults;
using TodoApp.Server.DTOs.TaskDTOs;

namespace TodoApp.Server.Services
{
    public interface ITaskService
    {
        Task<Result<List<TaskDto>>> GetTasksByUser(string userId);
        Task<Result<TaskDto>> CreateTaskAsync(TaskCreateDto taskCreateDto, string UserId);
        Task<Result> UpdateTaskAsync(int id, TaskCreateDto taskCreateDto, string currentUserId);
        Task<Result> DeteleTaskAsync(int id, string currentUserId);
        Task DeleteCompleteTasksAsync(string currentUserId);
        Task<Result> CompleteTask(int id, string currentUserId);

    }
}
