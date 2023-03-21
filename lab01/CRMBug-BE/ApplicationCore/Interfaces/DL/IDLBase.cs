using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;

namespace ApplicationCore.Interfaces.DL
{
  public interface IDLBase<T>
  {
    IEnumerable<T> GetEntities();

    long Save(T entity);

    bool Delete(long entityID);

    Dictionary<string, object> GetDictionaryByLayoutCode();

    T GetEntityByProperty(T entity, PropertyInfo property, string columns = "*");

    string GetTableName<BEntity>();

    Dictionary<string, object> Grid(string oWhere, string columns, string limit, string join = "", string customColumns = "");

    T GetDataByID(long id);

    bool WriteLog(Notification notification);

    bool InsertSchedule(Schedule schedule);

    string GenerateAutoNumber(string fieldName);
  }
}
