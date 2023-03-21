using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoAPI.Entities;
using TodoAPI.Models.Todo;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static IList<string> _content = new List<string>()
        {
            "Go fishing","Do homework","Finish reading a book","Going to theater","Taking a picture","Sleeping","Dancing","Watching a movie","Playing piano"
        };
        private static IList<bool> _isDone = new List<bool>()
        {
            true,false
        };
        private static readonly List<Todo> _todos = new List<Todo>()
        {
            new Todo()
            {
                Id = Guid.NewGuid(),
                Content = _content[new Random().Next(0, _content.Count)],
                IsDone= _isDone[new Random().Next(0, _isDone.Count)],
            },
            new Todo()
            {
                Id = Guid.NewGuid(),
                Content = _content[new Random().Next(0, _content.Count)],
                IsDone= _isDone[new Random().Next(0, _isDone.Count)],
            },
            new Todo()
            {
                Id = Guid.NewGuid(),
                Content = _content[new Random().Next(0, _content.Count)],
                IsDone= _isDone[new Random().Next(0, _isDone.Count)],
            }
        };
        [HttpGet("todo")]
        public IActionResult GetAllTodo()
        {
            try
            {
                return Ok(_todos);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        /// <summary>
        /// Get a todo by id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Todo</returns>
        [HttpGet("todo/{id}")]
        public IActionResult GetTodo(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return BadRequest();
                }
                var res = _todos.Find(x => x.Id == id);
                if (res == null)
                {
                    return NotFound();
                }
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="todo"></param>
        /// <returns></returns>
        [HttpPost("todo/add")]
        public IActionResult AddTodo(AddTodoRequest todo)
        {
            try
            {
                _todos.Add(new Todo()
                {
                    Id = Guid.NewGuid(),
                    Content= todo.Content,
                    IsDone = false
                });
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        /// <summary>
        /// Update content a todo by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="todo"></param>
        /// <returns>Accepted</returns>
        [HttpPut("todo/update/{id}")]
        public IActionResult UpdateTodoContent(Guid id, [FromBody] UpdateTodoRequest todo)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return BadRequest();
                }
                var res = _todos.Find(x => x.Id == id);
                if (res == null)
                {
                    return NotFound();
                }
                res.Content = todo.Content;
                res.IsDone = todo.IsDone;
                return Accepted(res);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>No Content</returns>
        [HttpDelete("todo/delete/{id}")]
        public IActionResult DeleteTodo(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return BadRequest();
                }
                var res = _todos.Find(x => x.Id == id);
                if (res == null)
                {
                    return NotFound();
                }
                _todos.Remove(res);
                return NoContent();
            }
            catch(Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
