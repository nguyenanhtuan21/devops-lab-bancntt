using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using TodoListBE.Core.Entities;

namespace TodoListBE.Infrastructure.Repository
{
    public class TodoRepository : BaseRepository<TodoItem>, ITodoRepository
    {
        public TodoRepository(IConfiguration configuration) : base(configuration)
        {

        }

        #region Methods
        public async Task<int> InsertItem(TodoItem item) {
            var commandSQL = $"INSERT INTO {tableName} (Id, Name)  VALUES (UUID(), '{item.Name}')";

            using (_mySqlConnection = new MySqlConnection(connectString))
            {
                _mySqlConnection.Open();
                var insert = await _mySqlConnection.QueryAsync<int>(commandSQL);
                _mySqlConnection.Close();
                return insert.FirstOrDefault();
            }
        }

        public async Task<int> UpdateItem(TodoItem item, Guid Id)
        {
            var commandSQL = $"UPDATE {tableName} SET Name = '{item.Name}' WHERE Id LIKE '{Id.ToString()}';";

            using (_mySqlConnection = new MySqlConnection(connectString))
            {
                _mySqlConnection.Open();
                var insert = await _mySqlConnection.QueryAsync<int>(commandSQL);
                _mySqlConnection.Close();
                return insert.FirstOrDefault();
            }
        }
        #endregion
    }
}
