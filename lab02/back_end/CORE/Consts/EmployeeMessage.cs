using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Consts
{
    public static class EmployeeMessage
    {
        // Mã nhân viên trống
        public const string EmployeeCode = "Mã nhân viên không được để trống";

        // Tên nhân viên trống
        public const string EmployeeName = "Tên viên không được để trống";

        // Mã đơn vị trống
        public const string DepartmentID = "Mã đơn vị không được để trống";

        // Email không đúng định dạng
        public const string Email = "Email không đúng định dạng";

        // Độ dài mã code không hợp lệ
        public const string LengthCode = "Mã phải nhỏ hơn bằng 20 ký tự";

        // Độ dài số điện thoại không hợp lệ
        public const string LengthPhoneNumber = "Số điện thoại phải từ 1 đến 20 chữ số";

        // Độ dài số CMND không hợp lệ
        public const string LengthIdentity = "Số CMND phải từ 1 đến 50 chữ số";

        // Độ dài số tài khoản ngân hàng không hợp lệ
        public const string LengthBankAccount = "Số tài khoản ngân hàng phải từ 1 đến 20 chữ số";
    
    }
}
