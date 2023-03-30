using System.ComponentModel.DataAnnotations;

namespace Lab01
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
    }
}
