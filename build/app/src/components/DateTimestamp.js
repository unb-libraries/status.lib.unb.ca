import React, { useState } from "react"
import { DateTime, Interval } from "../helpers/time"
import Tooltip from "./UI/Tooltip"

const DateTimestamp = (props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const datetime = props.milliseconds === 'now'
    ? DateTime.now()
    : DateTime.fromTimestamp(props.milliseconds)

  let formatted = datetime.format()
  const tooltipContent = formatted
  if (props.elapsed) {
    formatted = Interval
      .untilNow(datetime)
      .duration()
      .format() || props.altText || ''
  }

  if (props.text) {
    formatted = props.text.replace('{}', formatted)
  }

  const tooltipToggler = (visible) => {
    setTooltipVisible(visible)
  }

  return (
    <div className="datetimestamp">
      <span onMouseEnter={tooltipToggler.bind(null, true)} onMouseLeave={tooltipToggler.bind(null, false)}>{formatted}</span>
      {tooltipVisible && <Tooltip content={tooltipContent} />}
    </div>
  )
}

export default DateTimestamp