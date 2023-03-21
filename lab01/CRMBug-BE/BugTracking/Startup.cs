using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ApplicationCore.Authentication.JWT.Generators;
using ApplicationCore.BL;
using ApplicationCore.Interfaces.BL;
using ApplicationCore.Interfaces.DL;
using BugTracking.Middlewares;
using Infarstructure.Base;
using Infarstructure.Comments;
using Infarstructure.Employees;
using Infarstructure.Notifications;
using Infarstructure.Projects;
using Infarstructure.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

namespace BugTracking
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options => options.AddPolicy("MyPolicy", builder =>
      {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
      }));

      services.AddDistributedMemoryCache();

      services.AddSession((optional) =>
      {
        optional.IdleTimeout = TimeSpan.FromMinutes(360); // 360 phút  
      });

      services.AddHttpContextAccessor();

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
              options.TokenValidationParameters = new TokenValidationParameters
              {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["JwtConfig:Issuer"],
                ValidAudience = Configuration["JwtConfig:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtConfig:AccessTokenSecret"]))
              };
            });

      services.AddControllers();

      services.AddControllers().AddJsonOptions(jsonOptions =>
      {
        jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
        jsonOptions.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
      });
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "BugTracking", Version = "v1" });
      });

      services.AddSingleton<AccessTokenGenerator>();
      // Thực hiện DI cho auth
      services.AddScoped<IBLAuth, BLAuth>();

      // Thực hiện DI cho base
      services.AddScoped(typeof(IBLBase<>), typeof(BLBase<>));
      services.AddScoped(typeof(IDLBase<>), typeof(DLBase<>));

      // Thực hiện DI cho task
      services.AddScoped<IBLTask, BLTask>();
      services.AddScoped<IDLTask, DLTask>();

      // Thực hiện DI cho employee
      services.AddScoped<IBLEmployee, BLEmployee>();
      services.AddScoped<IDLEmployee, DLEmployee>();

      // Thực hiện DI cho project
      services.AddScoped<IBLProject, BLProject>();
      services.AddScoped<IDLProject, DLProject>();

      // Thực hiện DI cho notification
      services.AddScoped<IBLNotification, BLNotification>();
      services.AddScoped<IDLNotification, DLNotification>();

      // Thực hiện DI cho comment
      services.AddScoped<IBLComment, BLComment>();
      services.AddScoped<IDLComment, DLComment>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BugTracking v1"));
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseCors("ApiCorsPolicy");

      app.UseSession();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseMiddleware<ExceptionMiddleware>();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
  public class DateTimeConverter : System.Text.Json.Serialization.JsonConverter<DateTime>
  {
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
      return DateTime.SpecifyKind(DateTime.Parse(reader.GetString()), DateTimeKind.Local);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
      writer.WriteStringValue(DateTime.SpecifyKind(value, DateTimeKind.Local));
    }
  }
}
