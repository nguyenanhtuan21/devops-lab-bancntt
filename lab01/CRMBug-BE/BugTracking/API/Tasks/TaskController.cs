using System;
using System.Collections.Generic;
using System.Linq;
using ApplicationCore.Interfaces.BL;
using BugTracking.API.Base;
using Library.Entities;
using Library.Entities.param;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Library.Enumeration.Enumeration;

namespace BugTracking.API.Tasks
{
  public class TaskController : BaseApiController<Task>
  {
    #region DECLARE
    IBLTask BL;
    #endregion

    #region CONSTRUCTOR
    public TaskController(IBLTask BLTask) : base(BLTask)
    {
      BL = BLTask;
    }
    #endregion

    #region Methods
    [HttpGet]
    [Route("FormData/{projectID}/{masterID}/{formModeState}")]
    [Authorize]
    public IActionResult GetFormData(long projectID, long masterID, int formModeState)
    {
      try
      {
        _serviceResult.Success = true;
        _serviceResult.Code = Code.Ok;
        _serviceResult.Data = BL.GetFormData(projectID, masterID, formModeState);

        return Ok(_serviceResult);

      }
      catch (Exception ex)
      {
        return GetExceptionResult(ex);
      }
    }
    /// <summary>
    /// Phương thức lấy thông tin tóm lược về công việc trong dự án
    /// </summary>
    /// <param name="projectID">ID dự án</param>
    /// <returns></returns>
    [HttpPost]
    [Route("GetSummaryData")]
    [Authorize]
    public IActionResult GetSummaryData(ParamReport param)
    {
      try
      {
        _serviceResult.Success = true;
        _serviceResult.Code = Code.Ok;
        _serviceResult.Data = BL.GetSummaryData(param);

        return Ok(_serviceResult);

      }
      catch (Exception ex)
      {
        return GetExceptionResult(ex);
      }
    }

    /// <summary>
    /// Phương thức lấy thông tin các công việc được xem gần đây
    /// </summary>
    /// <param name="taskIDs">danh sách ID công việc</param>
    /// <returns></returns>
    [HttpPost]
    [Route("GetDataRecentlyViewed")]
    [Authorize]
    public IActionResult GetDataRecentlyViewed(List<long> taskIDs)
    {
      try
      {
        _serviceResult.Success = true;
        _serviceResult.Code = Code.Ok;
        _serviceResult.Data = BL.GetDataRecentlyViewed(taskIDs);

        return Ok(_serviceResult);

      }
      catch (Exception ex)
      {
        return GetExceptionResult(ex);
      }
    }

    #endregion
  }
}
