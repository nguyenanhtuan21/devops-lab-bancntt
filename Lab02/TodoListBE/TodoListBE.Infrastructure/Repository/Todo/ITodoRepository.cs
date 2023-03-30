using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoListBE.Core.Entities;

namespace TodoListBE.Infrastructure.Repository
{
    public interface ITodoRepository
    {
        Task<IEnumerable<TodoItem>> GetAllListItem();

        Task<TodoItem> GetItemByID(Guid ID);

        Task<int> DeleteItemByID(Guid ID);

        Task<int> InsertItem(TodoItem item);

        Task<int> UpdateItem(TodoItem item, Guid Id);
    }
}
