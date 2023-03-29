using Microsoft.EntityFrameworkCore;
using ProductApi.Datas;
using ProductApi.Entities;

namespace ProductApi.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _appDbContext;
        public CategoryRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<int> AddCategoryAsync(Category category)
        {
            _appDbContext.Categories.Add(category);
            return await _appDbContext.SaveChangesAsync();
        }

        public async Task<int> DeleteCategoryAsync(Guid id)
        {
            var category = _appDbContext.Categories.FirstOrDefault(c => c.Id == id);
            if (category != null)
            {
                return 0;
            }
            _appDbContext.Remove(category);
            return await _appDbContext.SaveChangesAsync();
        }
        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _appDbContext.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryAsync(Guid id)
        {
            var res = await _appDbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if(res == null)
            {
                return new Category();
            }
            return res;
        }

        public async Task<int> UpdateCategoryAsync(Guid id, Category category)
        {
            var res = await _appDbContext.Categories.FirstOrDefaultAsync(x=>x.Id == id);
            if (res == null)
            {
                return 0;
            }
            _appDbContext.Entry(category).State = EntityState.Modified;
            return 1;
        }
    }
}
