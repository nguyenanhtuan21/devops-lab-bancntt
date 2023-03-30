using BusinessLogic.TaskBL;
using Common.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : BaseController<TaskEntity>
    {
        private readonly ITaskBL _taskBL;
        public TaskController(ITaskBL taskBL) : base(taskBL)
        {
            _taskBL = taskBL;
        }
    }
}
