using ProductApi.Entities;

namespace ProductApi.Services
{
    public interface ICategoryService
    {
        /// <summary>
        /// Get all categories
        /// </summary>
        /// <returns></returns>
        public Task<IEnumerable<Category>> GetAllCategoriesAsync();
    }
}
