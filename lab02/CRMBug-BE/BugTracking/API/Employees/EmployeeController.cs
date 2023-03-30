using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugTracking.API.Base;
using Microsoft.AspNetCore.Mvc;
using Library.Entities;
using ApplicationCore.Interfaces.BL;
using Microsoft.AspNetCore.Authorization;

namespace BugTracking.API.Employees
{
  public class EmployeeController : BaseApiController<Employee>
  {
    #region DECLARE
    IBLEmployee BL;
    #endregion
    #region CONSTRUCTOR
    public EmployeeController(IBLEmployee BLEmployee) : base(BLEmployee) 
    {
      BL = BLEmployee;
    }
    #endregion

    #region API
    [HttpGet]
    [Authorize]
    [Route("GetEmployeeByProjectID/{projectID}/{isInProject}")]
    public IActionResult GetEmployeeNotInProject(long projectID, bool isInProject)
    {
      try
      {
        var datas = BL.GetEmployeeByProjectID(projectID, isInProject);
        _serviceResult.Data = datas;
        _serviceResult.Success = true;
        return Ok(_serviceResult);
      }
      catch (Exception ex)
      {
        return GetExceptionResult(ex);
      }
    }

    [HttpGet]
    [Authorize]
    [Route("GetAllRole")]
    public IActionResult GetAllRole()
    {
      try
      {
        var datas = this.BL.GetAllRole();
        _serviceResult.Data = datas;
        _serviceResult.Success = true;
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
