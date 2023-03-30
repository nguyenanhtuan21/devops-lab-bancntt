using Microsoft.Extensions.Configuration;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL.BaseDL;

namespace DL.EmployeeDL
{
    public interface IEmployeeDL : IBaseDL<Employee>
    {
        #region Method

        /// <summary>
        /// API Lấy Nhân viên theo bộ lọc
        /// </summary>
        /// <param name="Offset">index bản ghi lấy đầu tiên</param>
        /// <param name="Limit">Giới hạn số bản ghi</param>
        /// <param name="Sort">Sắp xếp theo thuộc tính truyền vào</param>
        /// <param name="Where">Điều kiện lọc</param>
        /// <returns>Danh sách nhân viên, số bản ghi</returns>
        /// Created by: TVLOI (19/08/2022)
        Tuple<IEnumerable<Employee>, int> Filter(int Offset, int Limit, string Sort, string Where);

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
        /// Xóa nhiều bản ghi theo id
        /// </summary>
        /// <param name="employeesID">Set id</param>
        /// <returns>Số lượng bản ghi</returns>
        /// Created by: TVLOI (23/08/2022)
        int DeleteMultiple(List<Guid> listOfId);

        /// <summary>
        /// Kiểm tra tồn tại theo mã code
        /// </summary>
        /// <param name="code">EmployeeCode</param>
        /// <returns>bool</returns>
        /// Created by: TVLOI (23/08/2022)
        int GetByCode(string code);
        #endregion
    }
}
