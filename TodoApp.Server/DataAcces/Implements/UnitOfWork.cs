
using TodoApp.Server.Data;

namespace TodoApp.Server.DataAcces.Implements
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        public UnitOfWork(ApplicationDbContext dbContext, ITaskRepository taskRepository)
        {
            this._dbContext = dbContext;
            TaskRepository = taskRepository;
        }

        public ITaskRepository TaskRepository { get; }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public async Task SaveChangeAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
