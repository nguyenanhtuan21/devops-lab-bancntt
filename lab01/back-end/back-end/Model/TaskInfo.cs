namespace back_end.Model
{
    public class TaskInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public Guid Id { get; set; }     

        /// <summary>
        /// tên
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// desc
        /// </summary>
        public string? Description { get; set; }
    }
}
