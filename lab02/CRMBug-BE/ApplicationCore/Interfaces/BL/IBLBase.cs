using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;

namespace ApplicationCore.Interfaces.BL
{
  public interface IBLBase<T>
  {
    IEnumerable<T> GetEntities();
    ServiceResult Save(T entity);
    ServiceResult Delete(long entityID);
    Dictionary<string, object> GetDictionaryByLayoutCode();
    Dictionary<string, object> Grid(string oWhere, string columns, string limit, List<FilterField> filterFields);
    T GetDataByID(long id);
  }
}
