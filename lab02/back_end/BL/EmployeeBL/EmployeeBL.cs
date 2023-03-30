using BL.BaseBL;
using BL.DepartmentsBL;
using ClosedXML.Excel;
using Core.Consts;
using Core.DTO;
using Core.Entities;
using Core.Enums;
using DL.EmployeeDL;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gender = Core.Consts.Gender;

namespace BL.EmployeeBL
{
    public class EmployeeBL : BaseBL<Employee>, IEmployeeBL
    {
        #region Field

        private IEmployeeDL _employeeDL;
        private IDepartmentsBL _departmentsBL;
        #endregion

        #region Constructor

        public EmployeeBL(IEmployeeDL iEmployeeDL, IDepartmentsBL departmentsBL) : base(iEmployeeDL)
        {
            _employeeDL = iEmployeeDL;
            _departmentsBL = departmentsBL;
        }


        #endregion

        #region Method

        /// <summary>
        /// Xóa nhiều bản ghi theo id
        /// </summary>
        /// <param name="employeesID">Set id</param>
        /// <returns>Số lượng bản ghi</returns>
        /// Created by: TVLOI (23/08/2022)
        public dynamic DeleteMultiple(IEnumerable<EmployeeDTO> employeesID)
        {
            List<Guid> list = new List<Guid>();
            foreach (EmployeeDTO employee in employeesID)
            {
                list.Add(employee.Id);
            }
            var result = _employeeDL.DeleteMultiple(list);
            return result;
        }

        /// <summary>
        /// Xuất ra file excel
        /// </summary>
        /// <param name="employees">Danh sách nhân viên</param>
        /// <returns>file excel</returns>
        /// Created by: TVLOI (23/08/2022)
        public dynamic ExportToExcel(IEnumerable<Employee> employees)
        {
            using (var workbook = new XLWorkbook())
            {
                string[] header = {EmployeeExcel.Serial,
                    EmployeeExcel.EmployeeCode,
                    EmployeeExcel.EmployeeName,
                    EmployeeExcel.Gender,
                    EmployeeExcel.DataOfBirth,
                    EmployeeExcel.Position,
                    EmployeeExcel.Department,
                    EmployeeExcel.BankAccount,
                    EmployeeExcel.BankName
                };
                var worksheet = workbook.Worksheets.Add(EmployeeExcel.TitleTable);

                worksheet.Range("A1:I1").Merge();
                worksheet.Range("A2:I2").Merge();
                worksheet.Cell("A1").Value = EmployeeExcel.TitleTable;
                worksheet.Cell("A1").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                worksheet.Cell("A1").Style.Font.Bold = true;
                worksheet.Cell("A1").Style.Font.FontSize = 16;
                worksheet.Cell("A2").Style.Font.FontSize = 16;
                var currentRow = 3;
                var cols = typeof(EmployeeExcel).GetProperties();
                for (var i = 1; i <= header.Length; i++)
                {
                    worksheet.Cell(currentRow, i).Value = header[i - 1];
                    worksheet.Cell(currentRow, i).Style.Fill.BackgroundColor = XLColor.LightGray;
                    worksheet.Cell(currentRow, i).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                }
                worksheet.Row(3).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                worksheet.Row(3).Style.Font.Bold = true;
                foreach (Employee employee in employees)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = currentRow - 3;
                    worksheet.Cell(currentRow, 2).Value = employee.EmployeeCode;
                    worksheet.Cell(currentRow, 3).Value = employee.EmployeeName;
                    worksheet.Cell(currentRow, 4).Value = employee.GenderName;
                    worksheet.Cell(currentRow, 5).Value = employee.DateOfBirth;
                    worksheet.Cell(currentRow, 6).Value = employee.PositionName;
                    worksheet.Cell(currentRow, 7).Value = employee.DepartmentName;
                    worksheet.Cell(currentRow, 8).Value = employee.BankAccount;
                    worksheet.Cell(currentRow, 9).Value = employee.BankName;
                    worksheet.Range(worksheet.Cell(currentRow, 1), worksheet.Cell(currentRow, 9)).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    worksheet.Range(worksheet.Cell(currentRow, 1), worksheet.Cell(currentRow, 9)).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                }

                worksheet.Columns("A:I").AdjustToContents();
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return content;
                }
            }
        }

        /// <summary>
        /// API Lấy Nhân viên theo bộ lọc
        /// </summary>
        /// <param name="pageSize">Số bản ghi 1 trang</param>
        /// <param name="pageNumber">Trang đang chọn</param>
        /// <param name="SortBy">Sắp xếp theo thuộc tính truyền vào</param>
        /// <param name="employeeFilter">Điều kiện lọc</param>
        /// <returns>Danh sách nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        public PagingData<Employee> Filter(int? pageSize, int? pageNumber, string? employeeFilter, string? sortBy)
        {
            int offSet = 0;
            int limit = -1;
            string sort = null;
            string where = null;

            PagingData<Employee> pagingData = new PagingData<Employee>(pageNumber);
            if (pageNumber != null && pageSize != null)
            {
                offSet = (int)((pageNumber - 1) * pageSize);
                limit = (int)pageSize;
            }

            if (employeeFilter != null)
            {
                where = $"EmployeeCode like '%{employeeFilter}%' OR EmployeeName like '%{employeeFilter}%' OR PhoneNumber like '%{employeeFilter}%'";
            }
            if (sortBy != null)
            {
                sort = sortBy;
            }
            (IEnumerable<Employee>? employees, pagingData.TotalRecords) = _employeeDL.Filter(offSet, limit, sort, where);
            pagingData.CurrentPageRecords = employees.Count();

            if (pageSize != null)
            {
                pagingData.TotalPages = (int?)Math.Ceiling((decimal)((decimal)pagingData.TotalRecords / pageSize));
            }
            else
            {
                pagingData.TotalPages = 1;
            }

            pagingData.Data = (List<Employee>)employees;
            return pagingData;
        }

        /// <summary>
        /// API Lấy Mã nhân viên mới
        /// </summary>
        /// <param name=""></param>
        /// <returns>1 Mã nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        public string GetNewEmployeeCode()
        {
            return _employeeDL.GetNewEmployeeCode();
        }

        /// <summary>
        /// Lấy tổng số bản ghi
        /// </summary>
        /// <param name=""></param>
        /// <returns>totalRecords</returns>
        /// Created by: TVLOI (23/08/2022)
        public int GetTotalRecords()
        {
            return _employeeDL.GetTotalRecords();
        }
        #endregion

        #region vitual

        /// <summary>
        /// Hàm xử lý trước khi lưu nhân viên
        /// </summary>
        /// <param name="entity"></param>
        /// Created by: TVLOI (19/08/2022)
        protected override void BeforeSaveAsyn(Employee entity)
        {
            var check = _employeeDL.GetByCode(entity.EmployeeCode);
            if (check != 0)
            {
                throw new Exception(EmployeeException.DublicateCode);
            }
            if (entity.EmployeeID == null)
            {
                entity.EmployeeID = Guid.NewGuid();
                entity.CreatedDate = DateTime.Now;
            }
            switch (entity.Gender)
            {
                case Core.Enums.Gender.Female:
                    entity.GenderName = Gender.Fermale;
                    break;
                case Core.Enums.Gender.Male:
                    entity.GenderName = Gender.Male;
                    break;
                case Core.Enums.Gender.Other:
                    entity.GenderName = Gender.Other;
                    break;
                default:
                    entity.Gender = Core.Enums.Gender.Female;
                    entity.GenderName = Gender.Fermale;
                    break;
            }
            base.BeforeSaveAsyn(entity);
        }

        /// <summary>
        /// Hàm xử lý trước khi save và update nhân viên
        /// </summary>
        /// <param name="entity"></param>
        /// Created by: TVLOI (19/08/2022)
        protected override void BeforeSaveAndUpdate(Employee entity)
        {

            if (entity.DepartmentName == null)
            {
                var department = _departmentsBL.GetByID((Guid)entity.DepartmentID);
                entity.DepartmentName = department.DepartmentName;
            }
            base.BeforeSaveAndUpdate(entity);
        }
        #endregion
    }
}
