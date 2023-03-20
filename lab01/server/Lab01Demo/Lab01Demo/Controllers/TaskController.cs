using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Lab01Demo.Controllers
{
    [Route("api/Tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(StaticMemory.Tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TodoTask body)
        {
            var newTask = new TodoTask
            {
                Id = Guid.NewGuid().ToString(),
                Content = body.Content,
                Finished = false
            };
            lock (StaticMemory.Tasks)
            {
                StaticMemory.Tasks.Add(newTask);
            }
            return Ok(newTask);
        }

        [HttpPut]
        public async Task<IActionResult> Modify([FromBody] TodoTask body)
        {
            lock (StaticMemory.Tasks)
            {
                int i = 0;
                TodoTask founditem = null;

                StaticMemory.Tasks = StaticMemory.Tasks.Select((x) =>
                {
                    if (x.Id == body.Id)
                        return body;
                    return x;
                }).ToList();
                //StaticMemory.Tasks.ForEach((item) =>
                //    {
                //        if (item.Id == body.Id)
                //        {
                //            founditem = item;
                //        }
                //        i++;
                //    });
                //if(founditem != null)
                //{
                //    founditem.Finished=body.Finished;
                //    founditem.Content=body.Content;
                //}
            }
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] string id)
        {
            lock (StaticMemory.Tasks)
            {
                StaticMemory.Tasks.RemoveAll(task => task.Id == id);
            }
            return Ok();
        }
    }
}
