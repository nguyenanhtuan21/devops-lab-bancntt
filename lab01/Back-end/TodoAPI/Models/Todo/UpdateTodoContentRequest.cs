namespace TodoAPI.Models.Todo
{
    public class UpdateTodoRequest
    {
        /// <summary>
        /// Title
        /// </summary>
        public string? Content { get; set; }
        /// <summary>
        /// Isdone
        /// </summary>
        public bool IsDone { get; set; }
    }
}
