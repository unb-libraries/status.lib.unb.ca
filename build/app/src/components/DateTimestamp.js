import { DateTime, Interval } from "../helpers/time"

const DateTimestamp = (props) => {
  const datetime = props.milliseconds === 'now'
    ? DateTime.now()
    : DateTime.fromTimestamp(props.milliseconds)

  let formatted = datetime.format()
  if (props.elapsed) {
    formatted = Interval
      .untilNow(datetime)
      .duration()
      .format() || props.altText || ''
  }

  if (props.text) {
    formatted = props.text.replace('{}', formatted)
  }

  return (
    <span>{formatted}</span>
  )
}

export default DateTimestamp