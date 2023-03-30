var Message = Message || {}

Message = {
    Delete: {
        Title: "Xóa thành công",
        Content: (code) => `Bạn đã xóa nhân viên ${code}`
    },
    DeleteMultiple: {
        Title: "Xóa thành công",
        Content: (number) => `Bạn đã xóa ${number} nhân viên`
    },
    Edit: {
        Title: "Sửa thành công",
        Content: (code) => `Bạn đã sửa nhân viên ${code}`
    },
    Add: {
        Title: "Thêm thành công",
        Content: (code) => `Bạn đã Thêm nhân viên ${code}`
    },
    Error: {
        Title: "Đã có lỗi xảy ra",
        Content: `Vui lòng liên hệ MISA`
    },

}

export default Message