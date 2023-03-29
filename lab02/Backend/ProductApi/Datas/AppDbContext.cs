using Microsoft.EntityFrameworkCore;
using ProductApi.Entities;

namespace ProductApi.Datas
{
    /// <summary>
    /// App db context
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {

        }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(new Category
            {
                Id = Guid.NewGuid(),
                Name = "Đồ gia dụng",
                Description = "Đồ gia dụng rất cần thiết"
            });
        }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
    }
}
