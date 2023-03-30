import { ElNotification } from 'element-plus'

var Notification = Notification || {};

Notification.success = (title, message) => {
    ElNotification({
      title: title,
      message: message,
      position: 'bottom-right',
      type: 'success'
    })
}
Notification.warning = (title, message) => {
    ElNotification({
      title: title,
      message: message,
      position: 'bottom-right',
      type: 'warning'
    })
}
Notification.info = (title, message) => {
    ElNotification({
      title: title,
      message: message,
      position: 'bottom-right',
      type: 'info'
    })
}
Notification.error = (title, message) => {
    ElNotification({
      title: title,
      message: message,
      position: 'bottom-right',
      type: 'error',
      duration: 0,
    })
}

export default Notification
