using TodoApp.Server.Data.Entities;

namespace TodoApp.Server.DataAcces
{
    public interface ITaskRepository : IGenericRepository<Data.Entities.Task>
    {
        Task<ICollection<Data.Entities.Task>> GetTasksByUserAsync(string userId);
        Task<Data.Entities.Task?> GetByIdAsync(int id);
    }
}
