var Enumeration = Enumeration || {};

// Các mode của form detail
Enumeration.FormMode = {
    Add: 1,    // Thêm mới
    Edit: 2,   // Sửa
    Delete: 3,  // Xóa
    Show: {
        No: 0,
        Yes: 1
    }
}

// Giới tính
Enumeration.Gender = {
    Female: 0, // Nữ
    Male: 1,   // Nam
    Other: 2   // Khác
}

// các mode của MessageBox
Enumeration.MessageBox = {
    Delete: 1,
    Blank: 2,
    Close: 3,
    Duplicate: 4
}


export default Enumeration