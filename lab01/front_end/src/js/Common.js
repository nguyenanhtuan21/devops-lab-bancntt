// Các hàm dùng chung toàn chương trình
import $ from 'jquery'
var CommonFn = CommonFn || {};

// // Hàm format số tiền
// CommonFn.formatMoney = money => {
//     if(money && !isNaN(money)){
//         return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
//     }else{
//         return money;
//     }
// }

// Format ngày tháng
CommonFn.formatDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
}


CommonFn.BlankEmployee = {
    EmployeeCode: null,
    EmployeeName: null,
    PositionName: null,
    DepartmentName: null,
    DepartmentID: null,
    PhoneNumber: null,
    Email: null,
    GenderName: null,
    Gender: null,
    DateOfBirth: null,
    IdentityNumber: null,
    IdentityDate: null,
    IdentityPlace: null,
    BankName: null,
    BankAccount: null,
    BankBranch: null,
    LandlinePhoneNumber: null,
    Address: null
}

export default CommonFn
