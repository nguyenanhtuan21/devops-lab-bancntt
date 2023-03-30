
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Api.Helpers;
using Core.DTO;
using Core.Entities;
using BL.EmployeeBL;
using Api.BaseController;

namespace Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employee>
    {
        #region Field
        private readonly IEmployeeBL _employeeBL;

        #endregion

        #region Constructor
        public EmployeesController(IEmployeeBL employeeBL) : base(employeeBL)
        {
            _employeeBL = employeeBL;
        }
        #endregion

        #region Method

        /// <summary>
        /// Lấy mã nhân viên mới tự động tăng
        /// </summary>
        /// <returns>string</returns>
        /// CreatedBy: TVLOI 23/08/2001
        [HttpGet("NewEmployeeCode")]
        public IActionResult GetNewEmployeeCode()
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, _employeeBL.GetNewEmployeeCode());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, HandleError.GenerateExceptionResult(ex, HttpContext));
            }
        }

        /// <summary>
        /// Lấy danh sách nhân viên theo bộ lọc
        /// </summary>
        /// <param name="pageSize">Số bản ghi 1 trang</param>
        /// <param name="pageNumber">Trang số?</param>
        /// <param name="employeeFilter">Lọc theo mã và tên nhân viên</param>
        /// <param name="sortBy">Sắp xếp theo</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy: TVLOI 23/08/2001
        [HttpGet("Fillter")]
        public IActionResult Fillter([FromQuery] int? pageSize, [FromQuery] int? pageNumber, [FromQuery] string? employeeFilter, [FromQuery] string? sortBy)
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, _employeeBL.Filter(pageSize, pageNumber, employeeFilter, sortBy));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, HandleError.GenerateExceptionResult(ex, HttpContext));
            }
        }

        [HttpGet("Export")]
        public IActionResult ExportToExcel([FromQuery] string? filter)
        {
            PagingData<Employee> result = _employeeBL.Filter(null, null, filter, null);
            var content = _employeeBL.ExportToExcel(result.Data);
            return File(
                content,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "employees.xlsx");
        }

        [HttpPatch("Multiple")]
        public IActionResult DeleteMutiple([FromBody] List<EmployeeDTO> formData)
        {
            try
            {
                return StatusCode(StatusCodes.Status200OK, _employeeBL.DeleteMultiple(formData));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, HandleError.GenerateExceptionResult(ex, HttpContext));
            }
        }
        #endregion
    }
}
