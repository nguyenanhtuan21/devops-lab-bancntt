using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Authentication.JWT.Generators;
using ApplicationCore.Interfaces.BL;
using Library;
using Library.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BugTracking.API.Authentication
{
  [EnableCors("MyPolicy")]
  [Route("api/v1/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    #region Properties
    private readonly IBLAuth BLAuth;
    private ServiceResult _serviceResult;
    #endregion

    #region Constructor
    public AuthController(
            IBLAuth blAuth
            )
    {
      BLAuth = blAuth;
      _serviceResult = new ServiceResult();
    }
    #endregion
    /// <summary>
    /// Xác thực
    /// </summary>
    /// <param name="entity"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Authenticate(Employee entity)
    {
      try
      {
        //Gọi service xác thực tài khoản
        _serviceResult = BLAuth.Authenticate(entity);

        return Ok(_serviceResult);
      }
      catch (Exception ex)
      {
        _serviceResult.Success = false;
        _serviceResult.Data = ex;
        return Ok(_serviceResult);
      }
    }

    /// <summary>
    /// Đăng ký tài khoản
    /// </summary>
    /// <param name="entity"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Post(Employee entity)
    {
      try
      {
        //Gọi service xác thực tài khoản
        _serviceResult = BLAuth.SaveData(entity);

        return Ok(_serviceResult);
      }
      catch (Exception ex)
      {
        _serviceResult.Success = false;
        _serviceResult.Data = ex;
        return Ok(_serviceResult);
      }
    }
  }
}
