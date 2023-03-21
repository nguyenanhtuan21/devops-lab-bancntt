namespace todo_app
{
    public static class TaskList
    {
        public static List<TaskModel> Tasks { get; set; } = new List<TaskModel>();
    }

    public class TaskModel
    {
        public Guid Id { get; set; }
        public string NameTask { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
    }
}
