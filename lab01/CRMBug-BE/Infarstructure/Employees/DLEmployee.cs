using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using ApplicationCore.Interfaces.DL;
using Infarstructure.Base;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using Library.Constant;
using Library;

namespace Infarstructure.Employees
{
  public class DLEmployee : DLBase<Employee>, IDLEmployee
  {
    #region Constructor
    public DLEmployee(IConfiguration configuration) : base(configuration)
    {

    }
    #endregion

    #region Methods

    public List<Dictionary<string, object>> GetAllRole()
    {
      List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
      string sql = Constant.DLEmployee_GetRoleEmployee;
      using (var rd = _dbConnection.ExecuteReader(sql, commandType: CommandType.Text))
      {
        if (rd != null)
        {
          data = rd.ToListDictionary();
        }
      }
      return data;
    }
    public IEnumerable<Employee> GetEmployeeByProjectID(long projectID, bool isInProject)
    {
      string sql = string.Empty;
      if(isInProject)
      {
        sql = "SELECT e.*, r.RoleName AS RoleIDText FROM employee e JOIN employee_project_mapping epm ON e.ID = epm.EmployeeID JOIN role r ON r.ID = e.RoleID WHERE epm.ProjectID = @ProjectID";
      } else
      {
        sql = $"SELECT e.ID,CONCAT(e.FullName, \' (\',e.EmployeeCode,\')\') AS FullName,e.Email FROM employee e WHERE IsActived = true AND e.ID NOT IN ( SELECT epm.EmployeeID FROM employee_project_mapping epm WHERE epm.ProjectID = @ProjectID );";
      }
      return _dbConnection.Query<Employee>(sql, new { ProjectID = projectID }, commandType: CommandType.Text);
    }
    #endregion
  }
}
