using ProductApi.Entities;

namespace ProductApi.Repositories
{
    public interface ICategoryRepository
    {
        /// <summary>
        /// Get all category async
        /// </summary>
        /// <returns>IEnumerable<Category></returns>
        public Task<IEnumerable<Category>> GetAllCategoriesAsync();
        /// <summary>
        /// Get category by id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        public Task<Category> GetCategoryAsync(Guid id);
        /// <summary>
        /// Add category async
        /// </summary>
        /// <param name="category">category</param>
        /// <returns></returns>
        public Task<int> AddCategoryAsync(Category category);
        /// <summary>
        /// Delete category
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>savechange</returns>
        public Task<int> DeleteCategoryAsync(Guid id);
        /// <summary>
        /// Update category
        /// </summary>
        /// <param name="id">id</param>
        /// <param name="category">category</param>
        /// <returns>save change</returns>
        public Task<int> UpdateCategoryAsync(Guid id, Category category);
        
    }
}
