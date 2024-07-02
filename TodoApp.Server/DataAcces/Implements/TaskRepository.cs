using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TodoApp.Server.Data;

namespace TodoApp.Server.DataAcces.Implements
{
    public sealed class TaskRepository : GenericRepository<Data.Entities.Task>, ITaskRepository
    {
        public TaskRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<ICollection<Data.Entities.Task>> GetTasksByUserAsync(string userId)
        {
            return await GetByCondition(task => task.UserId == userId).ToListAsync();
        }

        public async Task<Data.Entities.Task?> GetByIdAsync(int id)
        {
            return await GetByCondition(task => task.Id == id).FirstOrDefaultAsync();
        }
    }
}
