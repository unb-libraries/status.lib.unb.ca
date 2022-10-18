export const Permission = {
  DENIED: 1,
  UNKNOWN: 2,
  GRANTED: 4,
}

export const getPermission = async (force = false) => {
  switch (Notification.permission) {
    case 'denied': return Permission.DENIED
    case 'granted': return Permission.GRANTED
    case 'default':
    default:
      return !force 
      ? Permission.UNKNOWN
      : await Notification.requestPermission() === 'granted'
        ? Permission.GRANTED
        : Permission.DENIED
  }
}

export const sendNotification = (title, { body }) => {
  new Notification(title, {
    body,
  })
}