namespace todo_app
{
    public class TaskModel
    {
        public int ID { get; set; }
        public string IDTodo { get; set; }
        public string TodoName { get; set; }
        public bool Status { get; set; }
        public bool IsDelete { get; set; }
    }
}
