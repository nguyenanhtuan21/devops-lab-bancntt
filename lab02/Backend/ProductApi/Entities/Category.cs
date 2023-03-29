using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductApi.Entities
{
    /// <summary>
    /// Category table
    /// </summary>
    [Table("Category")]
    public class Category
    {
        [Key]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public Product? Product { get; set; }
    }
}
