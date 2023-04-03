using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;

namespace TestDBApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestDBController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public IEnumerable<dynamic> TestCallDB()
        {
            var res = -1;

            string a = DBContext.DBConnectionString;

            using (var mySqlConnection = new MySqlConnection(DBContext.DBConnectionString))
            {
                string getAllRecordsCommand = $"select * from task";
                var results = mySqlConnection.Query(getAllRecordsCommand);
                return results;
            }

            return null;
        }

        [HttpGet]
        [Route("testapi")]
        public string TestAPI()
        {
            return "Call Success 222";
        }
    }
}
