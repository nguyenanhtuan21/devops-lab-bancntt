using TodoApi.Models;

namespace TodoApi.Interfaces
{
    public interface ITodoRepository
    {
        public Task<IEnumerable<Todo>> Get();
        public Task<Todo> Get(int id);
        public Task<Todo> Create(Todo todo);
        public Task Update(int id, Todo todo);
        public Task Delete(int id);
    }
}
