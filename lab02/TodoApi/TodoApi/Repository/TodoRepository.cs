using Dapper;
using System.Data;
using TodoApi.Interfaces;
using TodoApi.Models;

namespace TodoApi.Repository
{
    public class TodoRepository : ITodoRepository
    {
        private readonly DbContext _context;

        public TodoRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> Get()
        {
            var query = "SELECT * FROM Todos";

            using (var connection = _context.CreateConnection())
            {
                var todos = await connection.QueryAsync<Todo>(query);
                return todos.ToList();
            }
        }

        public async Task<Todo> Get(int id)
        {
            var query = "SELECT * FROM Todos WHERE Id = @Id";
            using (var connection = _context.CreateConnection())
            {
                var todo = await connection.QuerySingleOrDefaultAsync<Todo>(query, new { id });
                return todo;
            }
        }

        public async Task<Todo> Create(Todo todo)
        {
            var query = "INSERT INTO Todos (Name) VALUES (@Name);" +
                "SELECT LAST_INSERT_ID()";

            var parameters = new DynamicParameters();
            parameters.Add("Name", todo.Name);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                var createdTodo = new Todo
                {
                    Id = id,
                    Name = todo.Name,
                };

                return createdTodo;
            }
        }

        public async Task Update(int id, Todo todo)
        {
            var query = "UPDATE Todos SET Name = @Name WHERE Id = @Id";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id);
            parameters.Add("Name",  todo.Name );
        
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task Delete(int id)
        {
            var query = "DELETE FROM Todos WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }
    }
}
