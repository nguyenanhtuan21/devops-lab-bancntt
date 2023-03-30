using Dapper;
using Demo.Modal;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

namespace Demo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {

        protected string _connectionString = "" +
           "Host = 127.0.0.1;" +
           "Port = 3306;" +
           "User Id = root;" +
           "Password = 12345678;" +
           "Database = Test;" +
           "convert zero datetime=True;";
        protected IDbConnection _dbConnection;
        
        [HttpGet(Name = "GetListName")]
        public IActionResult GetListName()
        {
            using (_dbConnection = new MySqlConnection(_connectionString))
            {
                string sqlCommand = $"SELECT * FROM Test;";
                var list = _dbConnection.Query<Test>(sqlCommand, commandType: CommandType.Text);
                return Ok(list);
            }
        }
    }
}
