using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoListBE.Infrastructure.Repository
{
    public interface IBaseRepository<T>
    {
        Task<IEnumerable<T>> GetAllListItem();

        Task<T> GetItemByID(Guid ID);

        Task<int> DeleteItemByID(Guid ID);
    }
}
