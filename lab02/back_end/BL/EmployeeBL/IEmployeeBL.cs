using BL.BaseBL;
using Core.DTO;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.EmployeeBL
{
    public interface IEmployeeBL : IBaseBL<Employee>
    {
        #region Method

        /// <summary>
        /// API Lấy Nhân viên theo bộ lọc
        /// </summary>
        /// <param name="pageSize">Số bản ghi 1 trang</param>
        /// <param name="pageNumber">Trang đang chọn</param>
        /// <param name="SortBy">Sắp xếp theo thuộc tính truyền vào</param>
        /// <param name="employeeFilter">Điều kiện lọc</param>
        /// <returns>Danh sách nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        PagingData<Employee> Filter(int? pageSize, int? pageNumber, string? employeeFilter, string? SortBy);

        /// <summary>
        /// API Lấy Mã nhân viên mới
        /// </summary>
        /// <param name=""></param>
        /// <returns>1 Mã nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        string GetNewEmployeeCode();

        /// <summary>
        /// Lấy tổng số bản ghi
        /// </summary>
        /// <param name=""></param>
        /// <returns>totalRecords</returns>
        /// Created by: TVLOI (23/08/2022)
        int GetTotalRecords();

        /// <summary>
        /// Xuất ra file excel
        /// </summary>
        /// <param name="employees">Danh sách nhân viên</param>
        /// <returns>file excel</returns>
        /// Created by: TVLOI (23/08/2022)
        dynamic ExportToExcel(IEnumerable<Employee> employees);

        /// <summary>
        /// Xóa nhiều bản ghi theo id
        /// </summary>
        /// <param name="employeesID">Set id</param>
        /// <returns>Số lượng bản ghi</returns>
        /// Created by: TVLOI (23/08/2022)
        dynamic DeleteMultiple(IEnumerable<EmployeeDTO> employeesID);
        #endregion
    }
}
