var Message = Message || {}

Message = {

    Delete: (code) => `Bạn có thực sự muốn xóa nhân viên <${code}> không?`,
    DataChanged: "Dữ liệu đã bị thay đổi bạn có muốn cất không?",
    Duplicate: (code) => `Mã nhân viên <${code}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`,
    DeleteMultiple: `Bạn có thực sự muốn xóa những nhân viên đã chọn không?`
}

export default Message