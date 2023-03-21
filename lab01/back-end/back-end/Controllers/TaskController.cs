using back_end.Dto;
using back_end.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private List<TaskInfo> _tasks;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(_tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskParam body)
        {
            var newTask = new TaskInfo
            {
                Id = Guid.NewGuid(),
                Name = body.Name,
                Description = body.Description,
            };
            _tasks.Add(newTask);
            return Ok(newTask);
        }

        [HttpPut]
        public async Task<IActionResult> Modify([FromBody] TaskParam body)
        {
            var taskIndex = _tasks.FindIndex(task => task.Id == body.Id);
            if(taskIndex != -1) {
                _tasks[taskIndex].Name = body.Name;
                _tasks[taskIndex].Description = body.Description;   
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] Guid id)
        {
            var task = _tasks.Find(x => x.Id == id);
            if(task != null)
            {
                _tasks.Remove(task);

            }
            return Ok();
        }
    }
}
