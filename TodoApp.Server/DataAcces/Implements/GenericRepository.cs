using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TodoApp.Server.Data;
using TodoApp.Server.Data.Entities;

namespace TodoApp.Server.DataAcces.Implements
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _dbContext;
        private DbSet<T> _dbSet => _dbContext.Set<T>();

        public GenericRepository(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public void Create(T entity)
        {
            entity.CreatedDate = DateTime.Now;
            _dbSet.Add(entity);
        }

        public void Delete(T entity)
        {
           _dbSet.Remove(entity);
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet.AsNoTracking();
        }

        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression)
        {
            return _dbSet.Where(expression);
        }

        public void Update(T entity)
        {
            entity.LastUpdateDate = DateTime.Now;
            _dbSet.Update(entity);
        }

        public void DeleteRange(List<T> EntitiesToDelete)
        {
            _dbSet.RemoveRange(EntitiesToDelete);
        }
    }
}
