using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;
using System.Text;
using System;
using net_core_be;
using System.Reflection.Metadata;

namespace net_core_be
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodolistController : ControllerBase
    {
        [HttpGet]
        public ResponseResult GetAllTask()
        {
            try
            {
                var mySqlConnection = new MySqlConnection(TodoDBContext.ConnectionString);
                var getAllEmployeeCommand = "SELECT * FROM todolist;";
                var records = mySqlConnection.Query<TodoItem>(getAllEmployeeCommand);
                if(records != null)
                    {
                    return new ResponseResult
                    {
                        statusCode = 200,
                        Message = "Get All Success",
                        Data = records,
                    };
                }
                return new ResponseResult
                {
                    statusCode = 400,
                    Message = "Get All Error",
                    Data = new List<TodoItem>(),
                };
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    statusCode = 500,
                    Message = "Exception Error",
                    Data = new List<TodoItem>(),
                };
            }
        }

        [HttpPost]
        public ResponseResult AddTask([FromBody] TodoItem todoItem)
        {
            try
            {
                todoItem.Status = 0;
                string getAllQuery = "SELECT * FROM todolist;";
                string addQuery = "INSERT INTO todolist (ID,TodoName, Status)  VALUES (@ID,@TodoName, @Status);";

                var parameters = new DynamicParameters();
                parameters.Add("@ID", Guid.NewGuid().ToString());
                parameters.Add("@TodoName", todoItem.TodoName);
                parameters.Add("@Status", todoItem.Status);
                var mySqlConnection = new MySqlConnection(TodoDBContext.ConnectionString);
                int numberOfRows = mySqlConnection.Execute(addQuery, parameters);
                if (numberOfRows != 0)
                {
                    var records = mySqlConnection.Query<TodoItem>(getAllQuery);
                    return new ResponseResult
                    {
                        statusCode = 200,
                        Message = "Add task success",
                        Data = records,
                    };
                }
                return new ResponseResult
                {
                    statusCode = 400,
                    Message = "Add task error",
                    Data = new List<TodoItem>(),
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    statusCode = 500,
                    Message = "Exception Error",
                    Data = new List<TodoItem>(),
                };
            }
        }


        [HttpPut]
        [Route("UpdateStatus")]
        public ResponseResult UpdateStatusTask([FromQuery] TodoItem todoItem)
        {
            try
            {
                string getAllQuery = "SELECT * FROM todolist;";
                string updateQuery = "UPDATE todolist  SET Status = @Status,TodoName = @TodoName  WHERE ID = @ID;";

                var parameters = new DynamicParameters();
                parameters.Add("@ID", todoItem.ID);
                parameters.Add("@TodoName", todoItem.TodoName);
                parameters.Add("@Status", todoItem.Status);

                using (var mySqlConnection = new MySqlConnection(TodoDBContext.ConnectionString))
                {
                    int numberOfAffectedRows = mySqlConnection.Execute(updateQuery, parameters);
                    if (numberOfAffectedRows != 0)
                    {
                        var records = mySqlConnection.Query<TodoItem>(getAllQuery);
                        return new ResponseResult
                        {
                            statusCode = 200,
                            Message = "Get All Success",
                            Data = records,
                        };
                    }
                    return new ResponseResult
                    {
                        statusCode = 400,
                        Message = "Get All Error",
                        Data = new List<TodoItem>(),
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    statusCode = 500,
                    Message = "Exception Error",
                    Data = new List<TodoItem>(),
                };
            }
        }

        [HttpDelete]
        public ResponseResult DeleteTask([FromQuery] Guid id)
        {
            try
            {
                string getAllQuery = "SELECT * FROM todolist";
                string deleteQuery = "DELETE FROM todolist  WHERE ID = @ID;";

                var parameters = new DynamicParameters();
                parameters.Add("@ID", id);

                using (var mySqlConnection = new MySqlConnection(TodoDBContext.ConnectionString))
                {
                    int numberOfAffectedRows = mySqlConnection.Execute(deleteQuery, parameters);
                    if (numberOfAffectedRows != 0)
                    {
                        var records = mySqlConnection.Query(getAllQuery);
                        return new ResponseResult
                        {
                            statusCode = 200,
                            Message = "Delete task success",
                            Data = records,
                        };
                    }
                    return new ResponseResult
                    {
                        statusCode = 400,
                        Message = "Delete task error",
                        Data = new List<TodoItem>(),
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new ResponseResult
                {
                    statusCode = 500,
                    Message = "Exception Error",
                    Data = new List<TodoItem>(),
                };
            }
        }
    }

}

