using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using ApplicationCore.Interfaces.BL;
using ApplicationCore.Interfaces.DL;
using Library;
using Library.Entities.param;
using static Library.Enumeration.Enumeration;

namespace ApplicationCore.BL
{
  public class BLProject : BLBase<Project>, IBLProject
  {


    #region DECLARE
    IDLProject DLProject;
    #endregion

    #region CONSTRUCTOR
    public BLProject(IDLProject dlProject) : base(dlProject)
    {
      DLProject = dlProject;
    }


    #endregion

    #region Methods
    public bool InviteMember(ParamInviteUser param)
    {
      var rs =  this.DLProject.InviteMember(param.ProjectID, param.UserIDs);
      return rs;
    }

    public bool RemoveMember(ParamInviteUser param)
    {
      var rs = this.DLProject.RemoveMember(param.ProjectID, param.UserIDs);
      return rs;
    }

    public Dictionary<string, object> GetReport(ParamReport param)
    {
      return this.DLProject.GetReport(param);
    }

    public List<Dictionary<string, object>> GetProgressReport(ParamReport param)
    {
      return this.DLProject.GetProgressReport(param);
    }

    public Dictionary<string, object> GetAssignedReport(ParamReport param)
    {
      return this.DLProject.GetAssignedReport(param);
    }

    #endregion

    #region Methods Override
    protected override void AfterSave(Project entity)
    {
      base.AfterSave(entity);
      var userID = long.Parse(SessionData.UserID);
      List<long> userIDs = new List<long>()
      {
        userID
      };
      if(entity.EntityState == EntityState.Add)
      {
        var prop = entity.GetType().GetProperty("ProjectCode");
        entity = this.DLProject.GetEntityByProperty(entity, prop);
        var notification = new Notification()
        {
          Config = "",
          LayoutCode = "Project",
          ProjectID = entity.ID,
          FromUserID = userID,
          ToUserID = null,
          Content = string.Format(Properties.Resources.WriteLog_Add, $"<b>{SessionData.FullName}</b>", $"project <b>{entity.ProjectName}</b>"),
          EventName = "CREATE_PROJECT",
          CreatedBy = SessionData.FullName,
          ModifiedBy = SessionData.FullName
        };
        base.WriteLog(notification);
        this.DLProject.InviteMember(entity.ID, userIDs);
      }
    }

    protected override void AfterDeleteSuccess(long entityID)
    {
      base.AfterDeleteSuccess(entityID);

      // Xóa những thành phần phụ thuộc dự án bị xóa
      this.DLProject.DeleteDependance(entityID);
    }

    protected override string CustomJoinClause()
    {
      string join = " JOIN employee_project_mapping epm ON epm.ProjectID = T.ID";
      return join;
    }

    protected override void CustomWhereClause(ref string oWhere, List<FilterField> filterFields)
    {
      base.CustomWhereClause(ref oWhere, filterFields);
      var employeeID = filterFields.Where(x => x.FieldName == "EmployeeID")?.First()?.Value;
      if(employeeID != null)
      {
        oWhere += $" AND epm.EmployeeID = {employeeID}";
      }
    }
    #endregion
  }
}
