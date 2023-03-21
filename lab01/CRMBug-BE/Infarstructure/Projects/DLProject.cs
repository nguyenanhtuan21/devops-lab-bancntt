using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using ApplicationCore.Interfaces.DL;
using Infarstructure.Base;
using Microsoft.Extensions.Configuration;
using Library;
using Dapper;
using System.Data;
using Library.Entities.param;
using static Library.Enumeration.Enumeration;

namespace Infarstructure.Projects
{
  public class DLProject : DLBase<Project>, IDLProject
  {
    #region Constructor
    public DLProject(IConfiguration configuration) : base(configuration)
    {

    }
    #endregion

    #region Methods
    public bool InviteMember(long projectID, List<long> userIDs)
    {
      if (userIDs.Any())
      {
        string query = "INSERT INTO employee_project_mapping (EmployeeID, ProjectID, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy) VALUES ";
        List<string> inserts = new List<string>();
        string userName = SessionData.FullName;
        foreach (var id in userIDs)
        {
          inserts.Add($"({id}, {projectID}, NOW(), NOW(), \'{userName}\', \'{userName}\')");
        }

        query = $"{query} {string.Join(",", inserts.Select(x => x))};";
        return _dbConnection.Execute(query, commandType: CommandType.Text) > 0;
      } else
      {
        return false;
      }
    }
    public bool RemoveMember(long projectID, List<long> userIDs)
    {
      if (userIDs.Any())
      {
        string query = $"DELETE FROM employee_project_mapping WHERE ProjectID = @ProjectID AND EmployeeID IN ({string.Join(",", userIDs)})";
        
        return _dbConnection.Execute(query, new { ProjectID = projectID }, commandType: CommandType.Text) > 0;
      }
      else
      {
        return false;
      }
    }

    public bool DeleteDependance(long projectID)
    {
      string sql = "DELETE FROM task WHERE ProjectID = @ID;DELETE FROM employee_project_mapping WHERE ProjectID = @ID;DELETE FROM schedule WHERE ProjectID = @ID";

      return _dbConnection.Execute(sql, new { ID = projectID }, commandType: CommandType.Text) > 0;
    }

    public Dictionary<string, object> GetReport(ParamReport param)
    {
      Dictionary<string, object> datas = new Dictionary<string, object>();
      string sql = string.Empty;
      var parameter = new
      {
        ProjectID = param.ProjectID,
        FromDate = param.FromDate,
        ToDate = param.ToDate
      };
      switch (param.GroupBy)
      {
        case ViewReportType.Priority:
          sql = $"SELECT t.PriorityID, t.AssignedUserID, COUNT(t.AssignedUserID) AS Total FROM task t WHERE t.ProjectID = @ProjectID AND t.AssignedUserID IN ({string.Join(",", param.IDs)}) AND t.CreatedDate BETWEEN @FromDate AND @ToDate GROUP BY t.PriorityID, t.AssignedUserID;";
          break;
        case ViewReportType.Status:
          sql = $"SELECT t.StatusID, t.AssignedUserID, COUNT(t.AssignedUserID) AS Total FROM task t WHERE t.ProjectID = @ProjectID AND t.AssignedUserID IN ({string.Join(",", param.IDs)}) AND t.CreatedDate BETWEEN @FromDate AND @ToDate GROUP BY t.StatusID, t.AssignedUserID;";
          break;
      }
      sql += $"SELECT COUNT(t.ID) FROM task t WHERE t.ProjectID = @ProjectID AND t.AssignedUserID IN ({string.Join(",", param.IDs)}) AND t.CreatedDate BETWEEN @FromDate AND @ToDate;";
      using (var rd = _dbConnection.ExecuteReader(sql, parameter, commandType: CommandType.Text))
      {
        if (rd != null)
        {
          datas["Data"] = rd.ToListDictionary();
          if (rd.NextResult() && rd.Read())
          {
            datas["TotalRecord"] = rd.GetValue(0);
          }
        }
      }
      return datas;
    }

    public List<Dictionary<string, object>> GetProgressReport(ParamReport param)
    {
      List<Dictionary<string, object>> datas = new List<Dictionary<string, object>>();
      var parameter = new
      {
        ProjectID = param.ProjectID,
        FromDate = param.FromDate,
        ToDate = param.ToDate
      };
      var sql = $"SELECT t.AssignedUserID, ABS(IF(SUM(TIMESTAMPDIFF(HOUR, t.DueDate, t.CreatedDate)) = 0, 1, SUM(TIMESTAMPDIFF(HOUR, t.DueDate, t.CreatedDate))) / SUM(IF(TIMESTAMPDIFF(HOUR, t.CompletedDate, t.CreatedDate) = 0, 1 , TIMESTAMPDIFF(HOUR, t.CompletedDate, t.CreatedDate)))) AS ProcessPercent FROM task t WHERE t.ProjectID = @ProjectID AND t.AssignedUserID IN ({string.Join(",", param.IDs)}) AND t.CreatedDate BETWEEN @FromDate AND @ToDate AND t.StatusID IN(2,3) GROUP BY t.AssignedUserID;";
      using (var rd = _dbConnection.ExecuteReader(sql, parameter, commandType: CommandType.Text))
      {
        if (rd != null)
        {
          datas = rd.ToListDictionary();
        }
      }
      return datas;
    }

    public Dictionary<string, object> GetAssignedReport(ParamReport param)
    {
      Dictionary<string, object> datas = new Dictionary<string, object>();
      var parameter = new
      {
        ProjectID = param.ProjectID,
        FromDate = param.FromDate,
        ToDate = param.ToDate
      };
      var sql = $"SELECT t.AssignedUserID, CONCAT(e.FullName, ' (', e.EmployeeCode,')') AS FullName, SUM(ABS(TIMESTAMPDIFF(MINUTE, t.CreatedDate, IFNULL(t.CompletedDate, NOW())))) / COUNT(t.ID) AS AvarageCompletedTime, SUM(ABS(TIMESTAMPDIFF(MINUTE, t.CreatedDate, t.DueDate))) / COUNT(t.ID) AS AvarageDueTime, SUM(ABS(TIMESTAMPDIFF(MINUTE, t.DueDate, t.CompletedDate))) / COUNT(t.ID) AS CompletedLateTime, COUNT(t.ID) AS TotalTask FROM task t JOIN employee e ON t.AssignedUserID = e.ID WHERE t.ProjectID = @ProjectID AND t.AssignedUserID IN ({string.Join(",", param.IDs)}) AND t.CreatedDate BETWEEN @FromDate AND @ToDate GROUP BY t.AssignedUserID;";
      sql += $"SELECT COUNT(t.ID) FROM task t WHERE t.ProjectID = @ProjectID AND t.AssignedUserID IN ({string.Join(",", param.IDs)}) AND t.CreatedDate BETWEEN @FromDate AND @ToDate;";
      using (var rd = _dbConnection.ExecuteReader(sql, parameter, commandType: CommandType.Text))
      {
        if (rd != null)
        {
          datas["Data"] = rd.ToListDictionary();
          if (rd.NextResult() && rd.Read())
          {
            datas["TotalRecord"] = rd.GetValue(0);
          }
        }
      }
      return datas;
    }
    #endregion
  }
}
