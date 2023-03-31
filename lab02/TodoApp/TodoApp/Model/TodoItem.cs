namespace TodoApp.Model
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; }

        public TodoItem(int id)
        {
            Id = id;
            Title = "task " + id;
            CreatedDate = DateTime.Now;
        }

    }
}
