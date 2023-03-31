using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Model;

namespace TodoApp.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {

        [EnableCors()]
        public List<TodoItem> GetTasks()
        {
            var items = new List<TodoItem>();
            for (int i = 1; i <= 10; i++)
            {
                items.Add(new TodoItem(i));
            }
            return items.OrderBy(item => item.CreatedDate).ToList();
        }
    }
}
