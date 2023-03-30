using TodoListBE.Core.Entities;

namespace TodoListBE.BL.Services
{
    public interface ITodoService
    {
        Task<IEnumerable<TodoItem>> GetAllListItem();

        Task<TodoItem> GetItemByID(Guid ID);

        Task<int> DeleteItemByID(Guid ID);

        Task<int> InsertItem(TodoItem item);

        Task<int> UpdateItem(TodoItem item, Guid Id);
    }
}
