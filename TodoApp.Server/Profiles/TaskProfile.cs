using TodoApp.Server.DTOs.TaskDTOs;

namespace TodoApp.Server.Mapping
{
    public static class TaskProfile
    {
        public static Data.Entities.Task ToTask(this TaskCreateDto createDto)
        {
            return new Data.Entities.Task()
            {
                Description = createDto.Description
            };
        }

        public static Data.Entities.Task ToTask(this TaskCreateDto createDto, Data.Entities.Task task)
        {
            task.Description = createDto.Description;
            return task;
        }

        public static TaskDto ToTaskDto(this Data.Entities.Task task)
        {
            return new TaskDto()
            {
                Id = task.Id,
                Description = task.Description,
                IsComplete = task.IsComplete,
            };
        }
    }
}
