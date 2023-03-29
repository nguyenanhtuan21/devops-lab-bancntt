using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Dapper;
namespace LabDemo.Controllers
{
    [Route("api/Tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        MySqlConnection dbConnection;
        public TaskController(MySqlConnection connection)
        {
            dbConnection = connection;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await dbConnection.QueryAsync<TodoTask>("SELECT * FROM task");
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TodoTask body)
        {
            var newTask = new TodoTask
            {
                Content = body.Content,
                IsFinished = false
            };

            lock (StaticMemory.Tasks)
            {
                StaticMemory.Tasks.Add(newTask);
            }

            await dbConnection.ExecuteAsync("INSERT INTO task(Content, IsFinished) VALUES (@Content, @IsFinished)", new { newTask.Content, newTask.IsFinished});
            newTask.ID = await dbConnection.ExecuteScalarAsync<int>("SELECT max(id) from task");

            return Ok(newTask);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] TodoTask body)
        {
            await dbConnection.ExecuteAsync("UPDATE task SET Content = @Content, IsFinished = @IsFinished where ID = @ID", new { body.ID, body.Content, body.IsFinished } );
            return Ok();
        }
    }
}
