namespace LabDemo
{
    public static class StaticMemory
    {
        public static List<TodoTask> Tasks { get; set; } = new List<TodoTask>();
    }

    public class TodoTask
    {
        public string? Content { get; set; }
        public bool? IsFinished { get; set; }
        public int? ID { get; set; }
    }
}
