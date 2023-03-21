using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Entities
{
  #region Attributes
  /// <summary>
  /// Attribute quy định tên bảng
  /// </summary>
  [AttributeUsage(AttributeTargets.Class)]
  public class TableNameAttribute : Attribute
  {
    public string Name;

    public TableNameAttribute()
    {
      Name = string.Empty;
    }

    public TableNameAttribute(string name)
    {
      Name = name;
    }
  }

  /// <summary>
  /// Attribute quy định tên bảng
  /// </summary>
  [AttributeUsage(AttributeTargets.Class)]
  public class ViewNameAttribute : Attribute
  {
    public string Name;

    public ViewNameAttribute()
    {
      Name = string.Empty;
    }

    public ViewNameAttribute(string name)
    {
      Name = name;
    }
  }
  /// <summary>
  /// Attribute xác định các cột trong bảng của database
  /// </summary>
  [AttributeUsage(AttributeTargets.Property)]
  public class TableColumn : Attribute
  {

  }
  /// <summary>
  /// Attribute dùng để validate trường bắt buộc nhập
  /// </summary>
  [AttributeUsage(AttributeTargets.Property)]
  public class Required : Attribute
  {

  }

  /// <summary>
  /// Attribute dùng để validate trường duy nhất
  /// </summary>
  [AttributeUsage(AttributeTargets.Property)]
  public class Unique : Attribute
  {

  }
  #endregion
}
