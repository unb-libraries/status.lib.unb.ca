export const setTime = (timestamp, hours, minutes, seconds, milliseconds = 0) => {
  const date = new Date(timestamp)
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(seconds)
  date.setMilliseconds(milliseconds)
  return date
}

export const formatTime = (timestamp, format = {}) => {
  
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  return new Intl.DateTimeFormat('en-CA', {
    formatMatcher: format.fm || 'basic',
    year: format.y,
    month: format.m,
    day: format.d,
    hour: format.h,
    minute: format.min,
    timeZone: format.tz || "America/Moncton",
  }).format(timestamp)
}
