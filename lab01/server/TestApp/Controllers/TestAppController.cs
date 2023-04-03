using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace TestApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestAppController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public string TestGet()
        {
            return "Test app change";
        }

        [HttpGet]
        [Route("time")]
        public string GetTime()
        {
            string testTime = DateTime.Now.ToString("h:mm:ss tt");
            return testTime;
        }
    }
}
