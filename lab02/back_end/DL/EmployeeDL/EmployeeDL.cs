using Dapper;
using Microsoft.Extensions.Configuration;
using Core.Consts;
using Core.Entities;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using DL.EmployeeDL;
using DL.BaseDL;
using Gender = Core.Consts.Gender;

namespace DL.EmployeeDL
{
    public class EmployeeDL : BaseDL<Employee>, IEmployeeDL
    {
        #region Field
        private readonly string _conn;
        #endregion

        #region Constructor

        public EmployeeDL() : base()
        {
            _conn = DatabaseContext.ConnectionStrings;
        }
        #endregion


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
        public Tuple<IEnumerable<Employee>, int> Filter(int Offset, int Limit, string Sort, string Where)
        {
            using (var connection = new MySqlConnection(_conn))
            {
                var sql = @"Proc_Employee_GetPaging";
                var parameter = new { v_Offset = Offset, v_Limit = Limit, v_Sort = Sort, v_Where = Where };
                var results = connection.QueryMultiple(sql, parameter, commandType: CommandType.StoredProcedure);
                var employees = results.Read<Employee>().ToList();
                var totalRecords = results.Read<int>().First();
                var tuple = new Tuple<IEnumerable<Employee>, int>(employees, totalRecords);
                return tuple;
            }
        }

        /// <summary>
        /// API Lấy Mã nhân viên mới
        /// </summary>
        /// <param name=""></param>
        /// <returns>1 Mã nhân viên</returns>
        /// Created by: TVLOI (19/08/2022)
        public string GetNewEmployeeCode()
        {
            using (var connection = new MySqlConnection(_conn))
            {
                var sql = "Proc_Employee_GetMaxCode";
                var parameters = new DynamicParameters();
                var oldCode = connection.Query<string>(sql, commandType: CommandType.StoredProcedure).FirstOrDefault();
                int newCode = int.Parse(oldCode);
                newCode += 1;
                return $"NV{newCode}";
            }
        }

        /// <summary>
        /// Lấy tổng số bản ghi
        /// </summary>
        /// <param name=""></param>
        /// <returns>totalRecords</returns>
        /// Created by: TVLOI (23/08/2022)
        public int GetTotalRecords()
        {
            using (var connection = new MySqlConnection(_conn))
            {
                var sql = "SELECT COUNT(*) FROM employee";
                var result = connection.Query<int>(sql).First();
                return result;
            }
        }

        /// <summary>
        /// Xóa nhiều bản ghi theo id
        /// </summary>
        /// <param name="employeesID">Set id</param>
        /// <returns>Số lượng bản ghi</returns>
        /// Created by: TVLOI (23/08/2022)
        public int DeleteMultiple(List<Guid> listOfId)
        {
            string sqlCommand = "DELETE FROM EMPLOYEE WHERE EmployeeID IN (@Id)";
            var list = listOfId.AsEnumerable().Select(i => new { Id = i }).ToList();
            using var connection = new MySqlConnection(_conn);
            connection.Open();
            using (var transaction = connection.BeginTransaction())
            {
                var result = connection.Execute(sqlCommand, list, transaction: transaction);
                transaction.Commit();
                return result;
            }
        }

        /// <summary>
        /// Kiểm tra tồn tại theo mã code
        /// </summary>
        /// <param name="code">EmployeeCode</param>
        /// <returns>bool</returns>
        /// Created by: TVLOI (23/08/2022)
        public int GetByCode(string code)
        {
            string sqlCommand = "SELECT COUNT(1) FROM Employee WHERE EmployeeCode = @code";
            using (var connection = new MySqlConnection(_conn))
            {
                var result = connection.ExecuteScalar<int>(sqlCommand, code);
                return result;
            }
        }
        #endregion

        #region Overide
        /// <summary>
        /// Hàm xử lý sau khi save nhân viên
        /// </summary>
        /// <param name="entity"></param>
        /// Created by: TVLOI (19/08/2022)
        protected override void AfterSaveAsyn(Employee entity)
        {
            base.AfterSaveAsyn(entity);
        }

        /// <summary>
        /// Hàm xử lý trước khi lưu nhân viên
        /// </summary>
        /// <param name="entity"></param>
        /// Created by: TVLOI (19/08/2022)
        protected override void BeforeSaveAsyn(Employee entity)
        {
            entity.EmployeeID = Guid.NewGuid();
            entity.CreatedDate = DateTime.Now;
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
                    entity.GenderName = Gender.Fermale;
                    break;
            }
            base.BeforeSaveAsyn(entity);
        }

        #endregion
    }
}
