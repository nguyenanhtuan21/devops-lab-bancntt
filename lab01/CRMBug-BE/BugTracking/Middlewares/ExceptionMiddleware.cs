using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using static Library.Enumeration.Enumeration;

namespace BugTracking.Middlewares
{
  public class ExceptionMiddleware
  {
    #region DECLARE
    private readonly RequestDelegate next;
    #endregion

    #region Constructor
    public ExceptionMiddleware(RequestDelegate next)
    {
      this.next = next;
    }

    #endregion

    #region Methods
    public async Task Invoke(HttpContext context)
    {
      try
      {
        await next(context);
      }
      catch (Exception e)
      {
        await HandleExceptionAsync(context, e);
      }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception e)
    {
      // Trả về 500 nếu có lỗi, kết quả không như mong đợi
      Library.Entities.ServiceResult rs = new Library.Entities.ServiceResult();
      rs.Data = e.Message;
      rs.Code = Code.Exception;
      var result = Utils.Serialize(rs);
      context.Response.ContentType = "application/json";
      context.Response.StatusCode = 200;
      return context.Response.WriteAsync(result);
    }
    #endregion
  }
}
