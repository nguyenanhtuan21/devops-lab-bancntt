namespace TodoAPI.Entities
{
    /// <summary>
    /// Todo entity
    /// </summary>
    public class Todo
    {
        /// <summary>
        /// Primary key id
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// The main content of the todo list
        /// </summary>
        public string? Content { get; set; }
        /// <summary>
        /// Is done?
        /// </summary>
        public bool IsDone { get; set; }

    }
}
