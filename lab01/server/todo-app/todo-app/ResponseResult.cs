namespace todo_app
{
    public class ResponseResult
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public List<TaskModel> Data { get; set; }
    }
}
