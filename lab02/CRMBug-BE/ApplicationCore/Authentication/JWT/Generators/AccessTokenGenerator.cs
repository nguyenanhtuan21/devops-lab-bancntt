using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ApplicationCore.Authentication.JWT.Generators
{
  /// <summary>
  /// Class tạo Access Token
  /// </summary>
  public class AccessTokenGenerator : TokenGenerator
  {
    public AccessTokenGenerator(IConfiguration config) : base(
        config["JwtConfig:AccessTokenSecret"],
        config["JwtConfig:Issuer"],
        config["JwtConfig:Audience"],
        config["JwtConfig:AccessTokenExpirationMinutes"],
        true
    )
    { }
  }
}
