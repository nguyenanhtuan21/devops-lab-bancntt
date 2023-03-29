using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using BL.DepartmentsBL;
using Api.BaseController;

namespace Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DepartmentsController : BaseController<Departments>
    {
        #region Field
        private readonly IDepartmentsBL _repos;

        #endregion

        #region Constructor
        public DepartmentsController(IDepartmentsBL repos) : base(repos)
        {
            _repos = repos;
        }

        #endregion

    }
}
