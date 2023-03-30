using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace TodoListBE.Infrastructure.Repository
{
    public class BaseRepository<T> : IDisposable, IBaseRepository<T> where T : class
    {
        #region Properties
        protected readonly string connectString = "";
        protected MySqlConnection _mySqlConnection;
        protected string tableName = "";
        #endregion

        #region Constructor
        public BaseRepository(IConfiguration configuration)
        {
            tableName = typeof(T).Name;
            connectString = configuration.GetConnectionString("TodoMySQLDB");
        }
        #endregion

        #region Method
        public async Task<IEnumerable<T>> GetAllListItem()
        {
            var commandSQL = $"SELECT * FROM {tableName}";

            using (var _mySqlConnection = new MySqlConnection(connectString))
            {
                _mySqlConnection.Open();
                var entities = await _mySqlConnection.QueryAsync<T>(commandSQL);
                return entities.ToList();
            }
        }

        public async Task<T> GetItemByID(Guid ID)
        {
            var commandSQL = $"SELECT * FROM {tableName} WHERE Id LIKE '{ID.ToString()}';";
            using (_mySqlConnection = new MySqlConnection(connectString))
            {
                _mySqlConnection.OpenAsync().Wait();
                var entities = await _mySqlConnection.QueryAsync<T>(commandSQL);
                return entities.FirstOrDefault();
            }
        }

        public async Task<int> DeleteItemByID(Guid ID)
        {
            var commandSQL = $"DELETE FROM {tableName} WHERE Id LIKE '{ID.ToString()}'";

            using (_mySqlConnection = new MySqlConnection(connectString))
            {
                var insert = await _mySqlConnection.QueryAsync<int>(commandSQL);
                return insert.FirstOrDefault();
            }
        }
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
