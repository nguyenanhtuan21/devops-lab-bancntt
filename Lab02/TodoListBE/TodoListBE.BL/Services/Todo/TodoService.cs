using TodoListBE.Core.Entities;
using TodoListBE.Infrastructure.Repository;

namespace TodoListBE.BL.Services
{
    public class TodoService : BaseService<TodoItem>, ITodoService
    {
        #region Properties
        private readonly ITodoRepository _todoRepository;
        #endregion

        #region Constructor
        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }
        #endregion

        #region Methods
        public async Task<IEnumerable<TodoItem>> GetAllListItem()
        {
            var entities = await _todoRepository.GetAllListItem();
            return entities.ToList();
        }

        public async Task<int> DeleteItemByID(Guid ID)
        {
            var deleteInt = await _todoRepository.DeleteItemByID(ID);
            return deleteInt;
        }


        public async Task<TodoItem> GetItemByID(Guid ID)
        {
            var entity = await _todoRepository.GetItemByID(ID);
            return entity;
        }

        public async Task<int> InsertItem(TodoItem item)
        {
            if (item == null || String.IsNullOrEmpty(item.Name))
            {
                throw new ArgumentNullException(nameof(item));
            }
            var existItem = await _todoRepository.GetItemByID(item.Id);
            if (existItem != null)
            {
                throw new Exception("Todo đã tồn tại");
            }

            var idx = await _todoRepository.InsertItem(item);
            return idx;
        }

        public async Task<int> UpdateItem(TodoItem item, Guid ID)
        {
            if (item == null || String.IsNullOrEmpty(item.Name))
            {
                throw new ArgumentNullException(nameof(item));
            }
            var idx = await _todoRepository.UpdateItem(item, ID);
            return idx;
        }
        #endregion
    }
}
