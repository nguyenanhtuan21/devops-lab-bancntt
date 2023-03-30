using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Enumeration
{
  public static class Enumeration
  {
    /// <summary>
    /// Trạng thái của object
    /// </summary>
    public enum EntityState
    {
      /// <summary>
      /// Thêm mới
      /// </summary>
      Add = 1,
      /// <summary>
      /// Cập nhật
      /// </summary>
      Edit = 2,
      /// <summary>
      /// Xóa
      /// </summary>
      Delete = 3,
      /// <summary>
      /// Xem
      /// </summary>
      View = 4
    }

    /// <summary>
    /// Code để xác định phản hồi của request
    /// </summary>
    public enum Code
    {
      /// <summary>
      /// Dữ liệu hợp lệ
      /// </summary>
      IsValid = 100,
      /// <summary>
      /// Dữ liệu chưa hợp lệ
      /// </summary>
      NotValid = 900,
      /// <summary>
      /// Thành công
      /// </summary>
      Ok = 200,
      /// <summary>
      /// Thất bại
      /// </summary>
      BadRequest = 400,
      /// <summary>
      /// Đăng nhập thất bại
      /// </summary>
      Authentication = 401,
      /// <summary>
      /// Thêm thành công
      /// </summary>
      Created = 201,
      /// <summary>
      /// Có lỗi xảy ra
      /// </summary>
      Exception = 500,
    }

    public enum Priority
    {
      Low = 1,
      Normal = 2,
      High = 3
    }

    public enum RoleEmployee
    {
      Admin = 1,
      Member = 2,
      Guest = 3,
    }

    public enum Operator
    {
      Equal = 1,
      Like = 2,
      Between = 3,
      In = 4
    }

    public enum Addition
    {
      And = 1,
      Or = 2,
    }

    public enum TaskStatus
    {
      Pending = 1,
      Completed = 2,
      CompletedLate = 3,
    }

    public enum ViewReportType
    {
      Priority = 1,
      Status = 2
    }
  }
}
