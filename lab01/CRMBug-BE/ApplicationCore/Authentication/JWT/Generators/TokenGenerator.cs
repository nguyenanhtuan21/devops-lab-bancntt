using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Library.Entities;
using Microsoft.IdentityModel.Tokens;

namespace ApplicationCore.Authentication.JWT.Generators
{
  /// <summary>
  /// Class tạo JWT
  /// </summary>
  public class TokenGenerator
  {
    #region Fields
    protected string jwtSecret;
    protected string jwtIssuer;
    protected string jwtAudience;
    protected string jwtTokenExpirationMinutes;
    protected bool jwtHasClaims = true;
    #endregion

    #region Constructor
    protected TokenGenerator(
        string cjwtSecret, string cjwtIssuer, string cjwtAudience, string cjwtTokenExpirationMinutes, bool cjwtHasClaims)
    {
      jwtSecret = cjwtSecret;
      jwtIssuer = cjwtIssuer;
      jwtAudience = cjwtAudience;
      jwtTokenExpirationMinutes = cjwtTokenExpirationMinutes;
      jwtHasClaims = cjwtHasClaims;
    }
    #endregion

    #region Methods
    /// <summary>
    /// Tạo token mới
    /// </summary>
    /// <param name="userInfo">User dùng để đưa thông tin vào token</param>
    /// <returns>token string</returns>
    public string GenerateToken(Employee userInfo = null)
    {
      var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
      var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

      //add identity to JWT token
      var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, (userInfo?.Username)??""),
                    new Claim("ID", (userInfo?.ID.ToString())??""),
                    new Claim("EmployeeID", userInfo?.EmployeeID.ToString()??""),
                    new Claim("EmployeeCode", userInfo?.EmployeeCode.ToString()??""),
                    new Claim(ClaimTypes.Role, userInfo?.RoleID.ToString()),
                    new Claim("RoleID", userInfo?.RoleID.ToString()),
                    new Claim("Date", DateTime.Now.ToString()),
                    new Claim("Email", userInfo?.Email ?? ""),
                    new Claim("PhoneNumber", userInfo?.PhoneNumber ?? ""),
                    new Claim("FirstName", userInfo?.FirstName ?? ""),
                    new Claim("LastName", userInfo?.LastName ?? ""),
                    new Claim("FullName", userInfo?.FullName ?? ""),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

      var token = new JwtSecurityToken(
        jwtIssuer,
        jwtAudience,
        jwtHasClaims ? claims : null,
        notBefore: DateTime.Now,
        expires: DateTime.Now.AddMinutes(double.Parse(jwtTokenExpirationMinutes)),
        signingCredentials: credentials
        );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
    #endregion
  }
}
