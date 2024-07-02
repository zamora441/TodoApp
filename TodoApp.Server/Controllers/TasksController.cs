using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Security.Claims;
using TodoApp.Server.DTOs.TaskDTOs;
using TodoApp.Server.Services;

namespace TodoApp.Server.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            this._taskService = taskService;
        }

        [HttpGet(Name ="GetTaskByUsers")]
        public async Task<ActionResult<List<TaskDto>>> Get()
        {
            var currentUserId = User.FindFirstValue("UserId");
            var result = await _taskService.GetTasksByUser(currentUserId);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return result.Value;
        }

        [HttpPost(Name ="CreateTask")]
        public async Task<ActionResult> Post([FromBody] TaskCreateDto taskCreateDto)
        {
            var currentUserId = User.FindFirstValue("UserId");
            var result = await _taskService.CreateTaskAsync(taskCreateDto, currentUserId);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return CreatedAtAction(null, result.Value);
        }

        [HttpPut("{id:int}", Name ="PutTask")]
        public async Task<ActionResult> Put([FromRoute] int id, [FromBody] TaskCreateDto taskCreateDto)
        {
            var currentUserId = User.FindFirstValue("UserId");
            var result = await _taskService.UpdateTaskAsync(id, taskCreateDto, currentUserId);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return NoContent();
        }

        [HttpPatch("{id:int}",Name ="CompleteTask")]
        public async Task<ActionResult<Result>> CompleteTask([FromRoute]int id)
        {
            var currentUserId = User.FindFirstValue("UserId");
            var result = await _taskService.CompleteTask(id, currentUserId);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id:int}", Name ="DeleteTask")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var currentUserId = User.FindFirstValue("UserId");
            var result = await _taskService.DeteleTaskAsync(id, currentUserId);
            if (result.IsFailed)
            {
                var error = result.Errors.First();
                var statusCode = (int)error.Metadata["StatusCode"];
                return StatusCode(statusCode, error.Message);
            }
            
            return NoContent() ;
        }

        [HttpDelete("deleteCompletedTasks", Name =("DeleteCompletedTasks"))]
        public async Task<ActionResult> DeleteCompletedTasks()
        {
            var currentUserId = User.FindFirstValue("UserId");
            await _taskService.DeleteCompleteTasksAsync(currentUserId);

            return NoContent() ;
        }

    }
}
