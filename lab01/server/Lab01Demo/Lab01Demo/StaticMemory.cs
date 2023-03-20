namespace Lab01Demo
{
    public static class StaticMemory
    {
        public static List<TodoTask> Tasks { get; set; } = new List<TodoTask>();
    }

    public class TodoTask
    {
        public string? Content { get; set; }
        public bool? Finished { get; set; }
        public string? Id { get; set; }
    }
}
