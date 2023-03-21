using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace todo_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        //public List<TaskModel> tasks = new List<TaskModel>();

        //public TaskController()
        //{
        //    lock (tasks)
        //    {
        //        tasks?.Add(new TaskModel
        //        {
        //            Id = Guid.Parse("3b249dfc-8c7f-4c46-8b15-cbdd4b487d80"),
        //            NameTask = "Nhiệm vụ 1",
        //            Description = "Nội dung nhiệm vụ",
        //            IsDone = false,
        //        });
        //        tasks?.Add(new TaskModel
        //        {
        //            Id = Guid.Parse("c61303cc-2d80-4278-8964-aebb3861ba00"),
        //            NameTask = "Nhiệm vụ 2",
        //            Description = "Nội dung nhiệm vụ",
        //            IsDone = false,
        //        });
        //    }
        //}

        [HttpGet]
        public ResponseResult GetAllTask()
        {
            return new ResponseResult
            {
                Code = 200,
                Message = "Get Data Success",
                Data = TaskList.Tasks,
            };
        }

        [HttpPost]
        public ResponseResult AddTask([FromBody] TaskModel taskModel)
        {
            lock (TaskList.Tasks)
            {
                taskModel.Id = Guid.NewGuid();
                TaskList.Tasks.Add(taskModel);
                return new ResponseResult
                {
                    Code = 200,
                    Message = "Add Task Success",
                    Data = TaskList.Tasks,
                };
            }
        }

        [HttpPut]
        public ResponseResult UpdateTask([FromBody] TaskModel taskModel)
        {
            lock (TaskList.Tasks)
            {
                var task = TaskList.Tasks.Find(s => s.Id == taskModel.Id);
                if (task != null)
                {
                    task.NameTask = taskModel.NameTask;
                    task.Description = task.Description;
                    return new ResponseResult
                    {
                        Code = 200,
                        Message = "Get Data Success",
                        Data = TaskList.Tasks,
                    };
                }
                else
                {
                    return new ResponseResult
                    {
                        Code = 400,
                        Message = "Error",
                        Data = new List<TaskModel>(),
                    };
                }
            }
        }

        [HttpPut]
        [Route("UpdateStatus")]
        public ResponseResult UpdateStatusTask([FromQuery] Guid id)
        {
            lock (TaskList.Tasks)
            {
                var task = TaskList.Tasks.Find(s => s.Id == id);
                if (task != null)
                {
                    task.IsDone = true;
                    return new ResponseResult
                    {
                        Code = 200,
                        Message = "Get Data Success",
                        Data = TaskList.Tasks,
                    };
                }
                else
                {
                    return new ResponseResult
                    {
                        Code = 400,
                        Message = "Error",
                        Data = new List<TaskModel>(),
                    };
                }
            }
        }

        [HttpDelete]
        public ResponseResult DeleteTask([FromQuery] Guid id)
        {
            lock (TaskList.Tasks)
            {
                var task = TaskList.Tasks.Find(s => s.Id == id);
                if (task != null)
                {
                    TaskList.Tasks.Remove(task);
                    return new ResponseResult
                    {
                        Code = 200,
                        Message = "Delte Task Success",
                        Data = TaskList.Tasks,
                    };
                }
                else
                {
                    return new ResponseResult
                    {
                        Code = 400,
                        Message = "Error",
                        Data = new List<TaskModel>(),
                    };
                }
            }
        }
    }

}
