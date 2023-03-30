using TodoListBE.Infrastructure.Repository;

namespace TodoListBE.BL.Services
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
    }
}
