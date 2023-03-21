using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Library.Entities;
using Microsoft.AspNetCore.Http;

namespace Library
{
  public class SessionData
  {
    private static List<Employee> _clients;
    private static IHttpContextAccessor _httpContextAccessor;
    private static HttpContext httpContext => HttpContextAccessor.HttpContext;
    public static IHttpContextAccessor HttpContextAccessor
    {
      get
      {
        if (_httpContextAccessor == null)
        {
          _httpContextAccessor = new HttpContextAccessor();
          return _httpContextAccessor;
        }
        else
        {
          return _httpContextAccessor;
        }
      }
    }
    public static string UserID
    {
      get
      {
        return httpContext.User.FindFirst("ID")?.Value;
      }
    }
    public static string FullName
    {
      get
      {
        string name = "admin";
        var fullName = httpContext.User.FindFirst("FullName")?.Value;
        var employeeCode = httpContext.User.FindFirst("EmployeeCode")?.Value;
        if(fullName != null && employeeCode != null)
        {
          name = $"{fullName} ({employeeCode})";
        }
        return name;
      }
    }
    public static string Email
    {
      get
      {
        return httpContext.User.FindFirst("Email")?.Value;
      }
    }

    public static List<Employee> Clients
    {
      get
      {
        if (_clients == null)
        {
          _clients = new List<Employee>();
        }
        return _clients;
      }
    }
  }
}
