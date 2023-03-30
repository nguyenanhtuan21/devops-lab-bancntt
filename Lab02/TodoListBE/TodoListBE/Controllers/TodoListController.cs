using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using TodoListBE.BL.Services;
using TodoListBE.Core.Entities;

namespace TodoListBE.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        #region Properties
        private readonly ILogger<TodoListController> _logger;
        private readonly ITodoService _todoService;
        #endregion

        #region Constructor
        public TodoListController(ILogger<TodoListController> logger, ITodoService todoService)
        {
            _logger = logger;
            _todoService = todoService;
        }
        #endregion

        #region Methods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> Get()
        {
            try
            {
                var todos = await _todoService.GetAllListItem();
                return Ok(todos);
            }
            catch (MySqlException ex)
            {
                return BadRequest(ex);
            }
            catch (Exception ex)
            {
                _logger.LogError("Get: Lấy thông tin todo thất bại!");
                return BadRequest(ex);
            }
        }

        [HttpGet("{ID}")]
        public async Task<ActionResult<TodoItem>> GetTodoByID(Guid ID)
        {
            try
            {
                var todos = await _todoService.GetItemByID(ID);
                return Ok(todos);
            }
            catch (Exception ex)
            {
                _logger.LogError("Get: Lấy thông tin todo thất bại!");
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] TodoItem todo)
        {
            try
            {
                var idx = await _todoService.InsertItem(todo);
                return NoContent();
            }
            catch(Exception ex)
            {
                _logger.LogError("AddTodo", ex);
                return BadRequest(ex);
                throw;
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditItem([FromBody] TodoItem todo, Guid ID)
        {
            try
            {
                var idx = await _todoService.UpdateItem(todo, ID);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("EditItem", ex);
                return BadRequest(ex);
                throw;
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTodoByID(Guid ID)
        {
            try
            {
                var idx = await _todoService.DeleteItemByID(ID);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("DeleteTodoByID", ex);
                return BadRequest(ex);
                throw;
            }
        }
        #endregion
    }
}
