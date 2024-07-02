using System.Linq.Expressions;
using TodoApp.Server.Data.Entities;

namespace TodoApp.Server.DataAcces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteRange(List<T> EntitiesToDelete);

    }
}
