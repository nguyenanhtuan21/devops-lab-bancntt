using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library
{
  public static class ExtensionMethod
  {
    public static List<Dictionary<string, object>> ToListDictionary(this IDataReader dataReader)
    {
      List<Dictionary<string, object>> listData = new List<Dictionary<string, object>>();
      while (dataReader.Read())
      {
        Dictionary<string, object> data = new Dictionary<string, object>();
        int fieldCount = dataReader.FieldCount;
        for (int i = 0; i < fieldCount; i++)
        {
          string name = dataReader.GetName(i);
          var value = dataReader[name];
          data.Add(name, value.ToString());
        }
        listData.Add(data);
      }
      return listData;
    }

    public static Dictionary<string, object> ToDictionary(this IDataReader dataReader)
    {
      Dictionary<string, object> data = new Dictionary<string, object>();
      while (dataReader.Read())
      {
        int fieldCount = dataReader.FieldCount;
        for (int i = 0; i < fieldCount; i++)
        {
          string name = dataReader.GetName(i);
          var value = dataReader[name];
          data.Add(name, value.ToString());
        }
      }
      return data;
    }

    public static List<T> ToListObject<T>(this IDataReader dataReader)
    {
      List<T> listData = new List<T>();
      var type = typeof(T);
      int fieldCount = dataReader.FieldCount;
      while (dataReader.Read())
      {
        var entity = Activator.CreateInstance<T>();
        for (int i = 0; i < fieldCount; i++)
        {
          string name = dataReader.GetName(i);
          var value = dataReader[name];
          var propInfo = type.GetProperty(name);
          if (propInfo != null && !string.IsNullOrEmpty(value.ToString()))
          {
            propInfo.SetValue(entity, value);
          }
        }
        listData.Add(entity);
      }
      return listData;
    }

    public static bool ValueIsNotNull(this Dictionary<string, object> dicData, string key)
    {
      if(dicData.ContainsKey(key) && dicData[key] != null)
      {
        return true;
      }
      return false;
    }
  }
}
