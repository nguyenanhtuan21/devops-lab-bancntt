using MISA.WEB07.CNTT2.LOI.Core.Entities;

namespace MISA.WEB07.CNTT2.LOI.Application.Interfaces
{
    public interface IEmployeeRepository
    {
        /// <summary>
        /// API Lấy tất cả nhân viên
        /// </summary>
        /// <param name=""></param>
        /// <returns>Danh sách tất cả nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        IEnumerable<Employee> GetEmployees();

        /// <summary>
        /// API Lấy nhân viên theo ID
        /// </summary>
        /// <param name="EmployeeID">ID nhân viên muốn lấy</param>
        /// <returns>1 nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        Employee GetEmployee(Guid id);

        /// <summary>
        /// API Lấy Mã nhân viên mới
        /// </summary>
        /// <param name=""></param>
        /// <returns>1 Mã nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        string GetNewEmployeeCode();

        /// <summary>
        /// API Thêm mới nhân viên
        /// </summary>
        /// <param name="Employee">nhân viên muốn thêm</param>
        /// <returns>Số row bị thay đổi</returns>
        /// Created by: TVLOI (19/08/2022)
        int Insert(Employee employee);

        /// <summary>
        /// API Sửa nhân viên
        /// </summary>
        /// <param name="EmployeeID, Employee">EmployeeID, nhân viên muốn Sửa</param>
        /// <returns>Số row bị thay đổi</returns>
        /// Created by: TVLOI (19/08/2022)
        int Update(Guid id, Employee employee);

        /// <summary>
        /// API xóa nhân viên
        /// </summary>
        /// <param name="EmployeeID">ID nhân viên muốn xóa</param>
        /// <returns>Số row bị thay đổi</returns>
        /// Created by: TVLOI (19/08/2022)
        int Delete(Guid id);

        /// <summary>
        /// API Lấy Nhân viên theo bộ lọc
        /// </summary>
        /// <param name="Offset">index bản ghi lấy đầu tiên</param>
        /// <param name="Limit">Giới hạn số bản ghi</param>
        /// <param name="Sort">Sắp xếp theo thuộc tính truyền vào</param>
        /// <param name="Where">Điều kiện lọc</param>
        /// <returns>Danh sách nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        IEnumerable<Employee> Fillter(int Offset, int Limit, string Sort, string Where);

        int GetTotalRecords();
    }
}
