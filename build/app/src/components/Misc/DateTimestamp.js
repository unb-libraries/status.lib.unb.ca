import React, { useState } from "react"
import { DateTime, Interval } from "../../helpers/time"
import Tooltip, { tooltipClasses } from "../UI/Tooltip"

const DateTimestamp = (props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const datetime = props.milliseconds === 'now'
    ? DateTime.now()
    : DateTime.fromTimestamp(props.milliseconds)

  let formatted = datetime.format()
  
  let tooltipContent
  if (props.tooltip) {
    tooltipContent = props.tooltip.replace('{}', formatted)
  }
  else {
    tooltipContent = formatted
  }

  if (props.elapsed) {
    formatted = Interval
      .untilNow(datetime)
      .duration()
      .format() || props.altText || ''
  }

  if (props.text) {
    formatted = props.text.replace('{}', formatted)
  }

  const toogleTooltip = (visible) => {
    setTooltipVisible(visible)
  }

  return (
    <div className={tooltipClasses.tooltipTarget}>
      <span onClick={e => e.stopPropagation()} onMouseEnter={toogleTooltip.bind(null, true)} onMouseLeave={toogleTooltip.bind(null, false)}>{formatted}</span>
      {tooltipVisible && <Tooltip content={tooltipContent} />}
    </div>
  )
}

export default DateTimestamp