using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Library.Enumeration.Enumeration;

namespace Library.Entities
{
  public class ServiceResult
  {
    /// <summary>
    /// Dữ liệu trả về
    /// </summary>
    public object Data { get; set; }
    /// <summary>
    /// Thông báo về kết quả
    /// </summary>
    public string Messenger { get; set; }
    /// <summary>
    /// Mã của kết quả
    /// </summary>
    public Code Code { get; set; }
    public bool Success { get; set; }
    public List<string> ValidateInfo { get; set; }
    public long TotalRecord { get; set; }
  }
}
