using Microsoft.AspNetCore.Mvc;

namespace Lab01.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        public WeatherForecastController()
        {
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IActionResult Get()
        {
            var dataContext = new DataContext();
            var data = dataContext.Users.ToList();
            return Ok(data);
        }
        [HttpPost]
        public IActionResult Add([FromBody]User user)
        {
            var dataContext = new DataContext();
            dataContext.Users.Add(user);
            dataContext.SaveChanges();
            var data = dataContext.Users.ToList();
            return Ok(data);
        }
    }
}