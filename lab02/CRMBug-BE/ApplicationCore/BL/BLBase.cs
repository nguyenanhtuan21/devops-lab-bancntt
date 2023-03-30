using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationCore.Interfaces.BL;
using ApplicationCore.Interfaces.DL;
using Library;
using Library.Entities;
using static Library.Enumeration.Enumeration;

namespace ApplicationCore.BL
{
  public class BLBase<T> : IBLBase<T> where T : BaseEntity
  {
    #region Declare
    IDLBase<T> DLBase;
    protected ServiceResult serviceResult;
    private bool isValid;
    #endregion

    #region Constructor 
    public BLBase(IDLBase<T> dlBase)
    {
      DLBase = dlBase;
      serviceResult = new ServiceResult();
      serviceResult.Code = Code.Ok;
      serviceResult.ValidateInfo = new List<string>();
      isValid = true;
    }
    #endregion

    #region Methods
    /// <summary>
    /// Lấy danh sách thực thể
    /// </summary>
    /// <returns>Danh sách thực thể</returns>
    /// Author: HHDang 23.2.2022
    public IEnumerable<T> GetEntities()
    {
      return DLBase.GetEntities();
    }

    public virtual ServiceResult Save(T entity)
    {
      isValid = Validate(entity);
      // Thêm mới dữ liệu khi đã hợp lệ:
      if (isValid)
      {
        isValid = ValidateCustom(entity);
      }
      if (isValid)
      {
        // Xử lý dữ liệu trước khi lưu
        this.BeforeSave(entity);
        // Lưu dữ liệu
        var rowAffects = DLBase.Save(entity);
        if (rowAffects > 0)
        {
          serviceResult.Success = true;
          if(entity.EntityState == EntityState.Add)
          {
            var propInfo = entity.GetType().GetProperty("ID");
            propInfo.SetValue(entity, rowAffects);
            serviceResult.Code = Code.Created;
          } else
          {
            serviceResult.Code = Code.Ok;
          }
          serviceResult.Data = entity;
          // Xử lý dữ liệu sau khi lưu thành công
          this.AfterSave(entity);
        }
        else
        {
          serviceResult.Code = Code.Exception;
          serviceResult.Data = "Some error has occured when excute query!";
        }
      }
      else
      {
        serviceResult.Code = Code.NotValid;
        serviceResult.Data = false;
      }
      return serviceResult;
    }


    public ServiceResult Delete(long entityID)
    {
      var success = DLBase.Delete(entityID);
      if (success)
      {
        this.AfterDeleteSuccess(entityID);

        serviceResult.Code = Code.Ok;
        serviceResult.Messenger = "Delete Success!";
        serviceResult.Data = entityID;
        serviceResult.Success = success;
      }
      else
      {
        serviceResult.Code = Code.Exception;
        serviceResult.Messenger = "Some error has occurred!";
        serviceResult.Data = entityID;
        serviceResult.Success = success;
      }
      return serviceResult;
    }

    protected virtual void AfterDeleteSuccess(long entityID)
    {
      // TODO
    }

    public Dictionary<string, object> GetDictionaryByLayoutCode()
    {
      return DLBase.GetDictionaryByLayoutCode();
    }

    public Dictionary<string, object> Grid(string oWhere, string columns, string limit, List<FilterField> filterFields)
    {
      this.CustomWhereClause(ref oWhere, filterFields);
      string join = this.CustomJoinClause();
      string customColumns = this.CustomColumns();
      return this.DLBase.Grid(oWhere, columns, limit, join, customColumns);
    }

    protected virtual void CustomWhereClause(ref string oWhere, List<FilterField> filterFields)
    {
      // TODO
    }

    protected virtual string CustomJoinClause()
    {
      return string.Empty;
    }

    protected virtual string CustomColumns()
    {
      return string.Empty;
    }

    public T GetDataByID(long id)
    {
      return this.DLBase.GetDataByID(id);
    }

    public bool Validate(T entity)
    {
      bool isValid = true;
      // Đọc các property
      var properties = entity.GetType().GetProperties();
      foreach (var prop in properties)
      {
        /// Lấy giá trị của property hiện tại
        var propertyValue = prop.GetValue(entity);
        /// Lấy tên hiển thị của property
        var displayName = string.Empty;
        DisplayNameAttribute displayNameAttribute = prop.GetCustomAttributes(typeof(DisplayNameAttribute), true).Cast<DisplayNameAttribute>().SingleOrDefault();
        if (displayNameAttribute != null)
        {
          displayName = displayNameAttribute.DisplayName;
        }
        if (prop.IsDefined(typeof(Required), false))
        {
          // Check bắt buộc nhập:
          var messenger = string.Format(Properties.Resources.Fail_ValidateRequired, displayName);
          if (propertyValue == null || string.IsNullOrEmpty(propertyValue.ToString()))
          {
            serviceResult.ValidateInfo.Add(messenger);
            isValid = false;
          }
        }
        if(prop.IsDefined(typeof(Unique), false))
        {
          // Check duy nhất:
          var data = this.DLBase.GetEntityByProperty(entity, prop, "ID");
          if(data != null)
          {
            var messenger = string.Format(Properties.Resources.Fail_ValidateUnique, displayName);
            serviceResult.ValidateInfo.Add(messenger);
            isValid = false;
          }
        }
      }

      return isValid;
    }

    public bool ValidateCustom(T entity)
    {
      return true;
    }

    protected virtual void BeforeSave(T entity)
    {
      // Build câu truy vấn
      //entity.Query = this.CreateQuery(entity);

      entity.SetQuery(this.CreateQuery(entity));
    }

    protected virtual void AfterSave(T entity)
    {
      // TODO
    }

    public bool WriteLog(Notification notification)
    {
      var properties = notification.GetType().GetProperties();
      var propertyNames = properties.Where(item => item.IsDefined(typeof(TableColumn), false)).Select(item => item.Name)?.ToList();
      //notification.Query = this.CreateAddQuery(propertyNames, "notification");
      notification.SetQuery(this.CreateAddQuery(propertyNames, "notification"));
      return this.DLBase.WriteLog(notification);
    }

    public bool InsertSchedule(Schedule schedule)
    {
      var properties = schedule.GetType().GetProperties();
      var propertyNames = properties.Where(item => item.IsDefined(typeof(TableColumn), false)).Select(item => item.Name)?.ToList();
      //schedule.Query = this.CreateAddQuery(propertyNames, "schedule");
      schedule.SetQuery(this.CreateAddQuery(propertyNames, "schedule"));
      return this.DLBase.InsertSchedule(schedule);
    }

    public string CreateQuery(T entity)
    {
      var properties = entity.GetType().GetProperties();
      var propertyNames = properties.Where(item => item.IsDefined(typeof(TableColumn), false)).Select(item => item.Name)?.ToList();
      string tableName = this.DLBase.GetTableName<T>();
      string query = string.Empty;
      switch (entity.EntityState)
      {
        case EntityState.Add:
          entity.CreatedBy = SessionData.FullName;
          entity.ModifiedBy = SessionData.FullName;
          query = this.CreateAddQuery(propertyNames, tableName);
          break;
        case EntityState.Edit:
          entity.ModifiedBy = SessionData.FullName;
          query = this.CreateEditQuery(propertyNames, tableName);
          break;
      }
      return query;
    }

    protected virtual string CreateAddQuery(List<string> propertyNames, string tableName)
    {
      string query = string.Empty;
      StringBuilder field = new StringBuilder("");
      StringBuilder value = new StringBuilder("");
      field.Append(string.Join(",", propertyNames));
      value.Append(string.Join(",", propertyNames.Select(item => $"@{item}")));
      field.Append(", CreatedDate, CreatedBy, ModifiedDate, ModifiedBy");
      value.Append($", NOW(), @CreatedBy, NOW(), @ModifiedBy");
      query = $"INSERT INTO {tableName} ({field}) VALUE ({value});SELECT LAST_INSERT_ID();";
      return query;
    }

    protected virtual string CreateEditQuery(List<string> propertyNames, string tableName)
    {
      string query = string.Empty;
      StringBuilder queryUpdate = new StringBuilder("");
      queryUpdate.Append(string.Join(",", propertyNames.Select(field => $"{field} = @{field}")));
      queryUpdate.Append($", ModifiedDate = NOW(), ModifiedBy = @ModifiedBy");
      query = $"UPDATE {tableName} SET {queryUpdate} WHERE ID = @ID";
      return query;
    }
    #endregion

  }
}
