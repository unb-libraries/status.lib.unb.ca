import { DateTime as LxDateTime, Interval as LxInterval, Duration as LxDuration } from 'luxon'

export const DateTimeFormat = {
  DATE: LxDateTime.DATE_MED,
  TIME: LxDateTime.TIME_SIMPLE,
  DATETIME: LxDateTime.DATETIME_MED
}

export class DateTime {
  constructor(unixTimestamp) {
    this._dt = LxDateTime.fromMillis(unixTimestamp)
  }

  static now = () => {
    return new DateTime(LxDateTime.now().toMillis())
  }

  static fromTimestamp = (timestamp) => {
    return new DateTime(timestamp)
  }

  toMilliseconds = () => {
    return this._dt.toMillis()
  }

  format = (format = DateTimeFormat.DATETIME) => {
    return this._dt.toLocaleString(format)
  }
}

export class Interval {
  constructor(from, until) {
    if (from.toMilliseconds() <= until.toMilliseconds()) {
      this.interval = LxInterval.fromDateTimes(from._dt, until._dt)
    }
    else {
      this.interval = LxInterval.fromDateTimes(until._dt, from._dt)
    }
  }

  static fromDateTimes = (from, until) => {
    return new Interval(from, until)
  }

  static untilNow = (from) => {
    return this.fromDateTimes(from, DateTime.now())
  }

  static fromDateAndDuration = (date, duration) => {
    return new Interval(date, date.add(duration))
  }

  duration = () => {
    const d = this
      .interval
      .toDuration([
        'days', 
        'hours', 
        'minutes', 
        'seconds', 
        'milliseconds'])
      .toObject()
    return new Duration(d.days, d.hours, d.minutes)
  }
}

export class Duration {
  constructor(days, hours, minutes) {
    this.days = Math.abs(days)
    this.hours = Math.abs(hours)
    this.minutes = Math.abs(minutes)
  }

  static fromMilliseconds = (milliseconds) => {
    const duration = LxDuration.fromMillis(milliseconds).shiftTo('days', 'hours', 'minutes').toObject()
    return new Duration(...Object.values(duration))
  }

  format = () => {
    const units = {'day': Math.round(this.days), 'hour': Math.round(this.hours), 'minute': Math.round(this.minutes)}
    const [unit, number] = Object.entries(units).find(([_, value]) => value > 0) || [undefined, 0]
    if (unit) {
      return `${number} ${unit}${number !== 1 ? 's' : ''}`
    }
    return false
  }
}

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
