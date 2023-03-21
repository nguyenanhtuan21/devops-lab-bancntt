using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ApplicationCore.Interfaces.BL;
using ApplicationCore.Interfaces.DL;
using Library;
using Library.Constant;
using Library.Entities;
using Library.Entities.param;
using static Library.Enumeration.Enumeration;

namespace ApplicationCore.BL
{
  public class BLTask : BLBase<Task>, IBLTask
  {
    #region DECLARE
    IDLTask DLTask;
    #endregion

    #region CONSTRUCTOR
    public BLTask(IDLTask dlTask) : base(dlTask)
    {
      DLTask = dlTask;
    }
    #endregion

    #region Methods

    public Dictionary<string, object> GetFormData(long projectID, long masterID, int formModeState)
    {
      Dictionary<string, object> data = base.GetDictionaryByLayoutCode();
      if (data != null)
      {
        if (formModeState == (int)EntityState.Edit)
        {
          data["CurrentData"] = DLTask.GetDataByID(masterID);
        }
        data["Employees"] = this.GetEmployeeByProjectID(projectID);
      }
      return data;
    }
    

    private void UpdateStatus(Task task)
    {
      var result = DateTime.Compare(DateTime.Now, task.DueDate);

      if (result <= 0)
      {
        task.StatusID = (int)TaskStatus.Completed;
        task.StatusIDText = "Completed";
      }
      else
      {
        task.StatusID = (int)TaskStatus.CompletedLate;
        task.StatusIDText = "Completed late";
      }
    }

    private void UpdatePriorityColor(Task task)
    {
      switch (task.PriorityID)
      {
        case (int)Priority.Low:
          task.PriorityColor = Constant.Color_Grey;
          break;
        case (int)Priority.Normal:
          task.PriorityColor = Constant.Color_Green;
          break;
        case (int)Priority.High:
          task.PriorityColor = Constant.Color_Red;
          break;
        default:
          task.PriorityColor = Constant.Color_Grey;
          break;
      }
    }

    private void UpdateStatusColor(Task task)
    {
      switch (task.StatusID)
      {
        case (int)TaskStatus.Pending:
          task.StatusColor = Constant.Color_Grey;
          break;
        case (int)TaskStatus.Completed:
          task.StatusColor = Constant.Color_Green;
          break;
        case (int)TaskStatus.CompletedLate:
          task.StatusColor = Constant.Color_Red;
          break;
        default:
          task.StatusColor = Constant.Color_Grey;
          break;
      }
    }

    private IEnumerable<Employee> GetEmployeeByProjectID(long id)
    {
      return DLTask.GetEmployeeByProjectID(id);
    }
    

    /// <summary>
    /// Phương thức lấy thông tin tóm lược về công việc trong dự án
    /// </summary>
    /// <param name="projectID">ID dự án</param>
    /// <returns></returns>
    public Dictionary<string, object> GetSummaryData(ParamReport param)
    {
      return this.DLTask.GetSummaryData(param);
    }


    /// <summary>
    /// Phương thức lấy thông tin các công việc được xem gần đây
    /// </summary>
    /// <param name="taskIDs">danh sách ID công việc</param>
    /// <returns></returns>
    public List<Dictionary<string, object>> GetDataRecentlyViewed(List<long> taskIDs)
    {
      return DLTask.GetDataRecentlyViewed(taskIDs);
    }
    #endregion

    #region Method overrides
    protected override void BeforeSave(Task task)
    {
      base.BeforeSave(task);
      if (task.EntityState == EntityState.Add)
      {
        task.TaskCode = this.DLTask.GenerateAutoNumber(nameof(Task.TaskCode));
      }

      if (task.CompletedProgress == 100)
      {
        this.UpdateStatus(task);

        if(task.CompletedDate == null)
        {
          task.CompletedDate = DateTime.Now;
        }
      }

      this.UpdatePriorityColor(task);

      this.UpdateStatusColor(task);
    }

    protected override void AfterSave(Task entity)
    {
      base.AfterSave(entity);
      if (entity.EntityState == EntityState.Add)
      {
        var notification = new Notification()
        {
          Config = "",
          LayoutCode = "Task",
          ProjectID = entity.ProjectID,
          FromUserID = long.Parse(SessionData.UserID),
          ToUserID = null,
          Content = string.Format(Properties.Resources.WriteLog_Add, $"<b>{SessionData.FullName}</b>", $"task <b>{entity.TaskCode}</b>"),
          EventName = "CREATE_TASK",
          CreatedBy = SessionData.FullName,
          ModifiedBy = SessionData.FullName,
        };
        base.WriteLog(notification);
        var taskCode = entity.GetType().GetProperty("TaskCode");
        entity = this.DLTask.GetEntityByProperty(entity, taskCode);
        var schedule = new Schedule()
        {
          TaskID = entity.ID,
          ProjectID = entity.ProjectID,
          IsDeleted = false,
          CreatedBy = SessionData.FullName,
          ModifiedBy = SessionData.FullName
        };
        base.InsertSchedule(schedule);
      }
    }
    protected override void AfterDeleteSuccess(long entityID)
    {
      base.AfterDeleteSuccess(entityID);

      this.DLTask.DeleteDependance(entityID);
    }
    #endregion
  }
}
