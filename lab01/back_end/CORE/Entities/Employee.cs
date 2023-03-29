using Core.Consts;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("employee")]
    public class Employee
    {
        #region Properties


        /// <summary>
        /// ID nhân viên
        /// </summary>
        [Key]
        public Guid? EmployeeID { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [Required(ErrorMessage = EmployeeMessage.EmployeeCode)]
        [StringLength(20, ErrorMessage = EmployeeMessage.LengthCode)]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Tên nhân viên 
        /// </summary>
        [Required(ErrorMessage = EmployeeMessage.EmployeeName)]
        public string? EmployeeName { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public Enums.Gender? Gender { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// ID đơn vị
        /// </summary>
        [Required(ErrorMessage = EmployeeMessage.DepartmentID)]
        public Guid? DepartmentID { get; set; }

        /// <summary>
        /// Tên đơn vị
        /// </summary>
        public string? DepartmentName { get; set; }

        /// <summary>
        /// Tên vị trí
        /// </summary>
        public string? PositionName { get; set; }

        /// <summary>
        /// Tên giới tính
        /// </summary>
        public string? GenderName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [EmailAddress(ErrorMessage = EmployeeMessage.Email)]
        public string? Email { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [StringLength(maximumLength:50,MinimumLength =1, ErrorMessage = EmployeeMessage.LengthPhoneNumber)]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string? Address { get; set; }

        /// <summary>
        /// Số điện thoại cố định
        /// </summary>
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = EmployeeMessage.LengthPhoneNumber)]
        public string? LandlinePhoneNumber { get; set; }

        /// <summary>
        /// Số chứng minh nhân dân
        /// </summary>
        [StringLength(maximumLength: 50, MinimumLength = 1, ErrorMessage = EmployeeMessage.LengthIdentity)]
        public string? IdentityNumber { get; set; }

        /// <summary>
        /// Ngày cấp CMND
        /// </summary>
        public DateTime? IdentityDate { get; set; }

        /// <summary>
        /// Nơi cấp CMND
        /// </summary>
        public string? IdentityPlace { get; set; }

        /// <summary>
        /// Tên ngân hàng
        /// </summary>
        public string? BankName { get; set; }

        /// <summary>
        /// Tài khoản ngân hàng
        /// </summary>
        [StringLength(maximumLength: 20, MinimumLength = 1, ErrorMessage = EmployeeMessage.LengthBankAccount)]
        public string? BankAccount { get; set; }

        /// <summary>
        /// Chi nhánh ngân hàng
        /// </summary>
        public string? BankBranch { get; set; }

        /// <summary>
        /// Người tạo
        /// </summary>
        public string? CreatedBy { get; set; }

        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người sửa
        /// </summary>
        public string? ModifiedBy { get; set; }

        /// <summary>
        /// Ngày sửa 
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        #endregion
    }
}
