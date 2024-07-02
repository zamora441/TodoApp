using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Server.DataAcces;
using TodoApp.Server.DTOs.TaskDTOs;
using TodoApp.Server.Errors;
using TodoApp.Server.Mapping;

namespace TodoApp.Server.Services.Implements
{
    public sealed class TaskService : ITaskService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TaskService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> CompleteTask(int id, string currentUserId)
        {
            var task = await _unitOfWork.TaskRepository.GetByIdAsync(id);
            if (task is null)
            {
                return new NotFoundError($"Task with {id} doesn't exist in the system");
            }
            if (task.UserId != currentUserId)
            {
                return new UnauthorizedError("You don't have permission to delete this task");
            }

            task.IsComplete = true;
            _unitOfWork.TaskRepository.Update(task);
            await _unitOfWork.SaveChangeAsync();
            return Result.Ok();
        }

        public async Task<Result<TaskDto>> CreateTaskAsync(TaskCreateDto taskCreateDto, string UserId)
        {
            var task = taskCreateDto.ToTask();
            task.UserId = UserId;
            _unitOfWork.TaskRepository.Create(task);
            await _unitOfWork.SaveChangeAsync();

            var taskDto = task.ToTaskDto();

            return Result.Ok(taskDto);
        }

        public async Task DeleteCompleteTasksAsync(string currentUserId)
        {
            var tasksToDelete = await _unitOfWork.TaskRepository.GetByCondition(task=> task.UserId == currentUserId && task.IsComplete == true).ToListAsync();
            _unitOfWork.TaskRepository.DeleteRange(tasksToDelete);
            await _unitOfWork.SaveChangeAsync();
        }

        public async Task<Result> DeteleTaskAsync(int id, string currentUserId)
        {
            var task = await _unitOfWork.TaskRepository.GetByIdAsync(id);
            if (task is null)
            {
                return new NotFoundError($"Task with {id} doesn't exist in the system");
            }
            if (task.UserId != currentUserId)
            {
                return new UnauthorizedError("You don't have permission to delete this task");
            }
            _unitOfWork.TaskRepository.Delete(task);
            await _unitOfWork.SaveChangeAsync();

            return Result.Ok();
        }

        public async Task<Result<List<TaskDto>>> GetTasksByUser(string userId)
        {
            var tasks = await _unitOfWork.TaskRepository.GetTasksByUserAsync(userId);
            var tasksDtos = tasks.Select(task => task.ToTaskDto()).ToList();

            return Result.Ok(tasksDtos);
        }


        public async Task<Result> UpdateTaskAsync(int id, TaskCreateDto taskCreateDto, string currentUserId)
        {
            var task = await _unitOfWork.TaskRepository.GetByIdAsync(id);
            if (task is null)
            {
                return new NotFoundError($"Task with {id} doesn't exist in the system");
            }
            if (task.UserId != currentUserId)
            {
                return new UnauthorizedError("You don't have permission to delete this task");
            }
            task = taskCreateDto.ToTask(task);
            _unitOfWork.TaskRepository.Update(task);
            await _unitOfWork.SaveChangeAsync();

            return Result.Ok();

        }


    }
}
