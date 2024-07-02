namespace TodoApp.Server.DataAcces
{
    public interface IUnitOfWork : IDisposable
    {
        ITaskRepository TaskRepository { get; }
        Task SaveChangeAsync();
    }
}
