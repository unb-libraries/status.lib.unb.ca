export const formatTime = timestamp => {
  return new Intl.DateTimeFormat('en-CA', {
    formatMatcher: 'basic',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Moncton"
  }).format(timestamp)
}