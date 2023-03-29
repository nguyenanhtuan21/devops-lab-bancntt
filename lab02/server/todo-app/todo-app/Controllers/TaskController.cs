using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Diagnostics;

namespace todo_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public async Task<ResponseResult> GetAllTask()
        {
            try
            {
                string getAllQuery = "SELECT * FROM todolist WHERE IsDelete = 0 ORDER BY id DESC";
                using (var mySqlConnection = new MySqlConnection(DatabaseContext.ConnectionString))
                {
                    var records = await mySqlConnection.QueryAsync(getAllQuery);
                    if (records != null)
                    {
                        return new ResponseResult
                        {
                            Code = 200,
                            Message = "Get All Success",
                            Data = records,
                        };
                    }
                    return new ResponseResult
                    {
                        Code = 400,
                        Message = "Get All Error",
                        Data = new List<TaskModel>(),
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    Code = 500,
                    Message = "Exception Error",
                    Data = new List<TaskModel>(),
                };
            }
        }

        [HttpPost]
        public async Task<ResponseResult> AddTask([FromBody] TaskModel taskModel)
        {
            try
            {
                taskModel.Status = false;
                taskModel.IsDelete = false;
                Guid newGuid = Guid.NewGuid();

                string getAllQuery = "SELECT * FROM todolist WHERE IsDelete = 0 ORDER BY id DESC";
                string addQuery = "INSERT INTO todolist (IDTodo, TodoName, Status, IsDelete)  VALUES (@IDTodo, @TodoName, @Status, @IsDelete);";

                var parameters = new DynamicParameters();
                parameters.Add("@IDTodo", newGuid);
                parameters.Add("@TodoName", taskModel.TodoName);
                parameters.Add("@Status", taskModel.Status);
                parameters.Add("@IsDelete", taskModel.IsDelete);

                using (var mySqlConnection = new MySqlConnection(DatabaseContext.ConnectionString))
                {
                    int numberOfAffectedRows = await mySqlConnection.ExecuteAsync(addQuery, parameters);
                    if (numberOfAffectedRows != 0)
                    {
                        var records = await mySqlConnection.QueryAsync(getAllQuery);
                        return new ResponseResult
                        {
                            Code = 200,
                            Message = "Add task success",
                            Data = records,
                        };
                    }
                    return new ResponseResult
                    {
                        Code = 400,
                        Message = "Add task error",
                        Data = new List<TaskModel>(),
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    Code = 500,
                    Message = "Exception Error",
                    Data = new List<TaskModel>(),
                };
            }
        }


        [HttpPut]
        [Route("UpdateStatus")]
        public async Task<ResponseResult> UpdateStatusTask([FromQuery] Guid id)
        {
            try
            {
                string getAllQuery = "SELECT * FROM todolist WHERE IsDelete = 0 ORDER BY id DESC";
                string updateQuery = "UPDATE todolist SET Status = 1 WHERE IDTodo = @IDTodo;";

                var parameters = new DynamicParameters();
                parameters.Add("@IDTodo", id);

                using (var mySqlConnection = new MySqlConnection(DatabaseContext.ConnectionString))
                {
                    int numberOfAffectedRows = await mySqlConnection.ExecuteAsync(updateQuery, parameters);
                    if (numberOfAffectedRows != 0)
                    {
                        var records = await mySqlConnection.QueryAsync(getAllQuery);
                        return new ResponseResult
                        {
                            Code = 200,
                            Message = "Get All Success",
                            Data = records,
                        };
                    }
                    return new ResponseResult
                    {
                        Code = 400,
                        Message = "Get All Error",
                        Data = new List<TaskModel>(),
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    Code = 500,
                    Message = "Exception Error",
                    Data = new List<TaskModel>(),
                };
            }
        }

        [HttpDelete]
        public async Task<ResponseResult> DeleteTask([FromQuery] Guid id)
        {
            try
            {
                string getAllQuery = "SELECT * FROM todolist WHERE IsDelete = 0 ORDER BY id DESC";
                string deleteQuery = "DELETE FROM todolist WHERE IDTodo = @IDTodo;";

                var parameters = new DynamicParameters();
                parameters.Add("@IDTodo", id);

                using (var mySqlConnection = new MySqlConnection(DatabaseContext.ConnectionString))
                {
                    int numberOfAffectedRows = await mySqlConnection.ExecuteAsync(deleteQuery, parameters);
                    if (numberOfAffectedRows != 0)
                    {
                        var records = await mySqlConnection.QueryAsync(getAllQuery);
                        return new ResponseResult
                        {
                            Code = 200,
                            Message = "Delete task success",
                            Data = records,
                        };
                    }
                    return new ResponseResult
                    {
                        Code = 400,
                        Message = "Delete task error",
                        Data = new List<TaskModel>(),
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    Code = 500,
                    Message = "Exception Error",
                    Data = new List<TaskModel>(),
                };
            }
        }
    }

}
