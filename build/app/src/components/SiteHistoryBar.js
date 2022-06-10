import { combine } from "../helpers/array"
import { formatTime } from "../helpers/time"

function SiteHistoryBar(props) {

  function aggregate(runs) {
    const aggregated = {}
    Object.entries(runs).forEach(([timestamp, status]) => {
      const date = new Date(parseInt(timestamp))
      const { year, month, day } = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, 0),
        day: date.getDate().toString().padStart(2, 0),
      }
      const key = new Date(`${year}/${month}/${day}`).getTime()
      if (!aggregated[key]) {
        aggregated[key] = []
      }
      aggregated[key].push(status)
    })

    return combine(Object.keys(aggregated), Object.values(aggregated).map(statuses => statuses.reduce((previous, current) => {
      if (current !== 'passed') {
        return 'failed'
      }
      else if (!previous) {
        return 'passed'
      }
      return previous
    })))
  }

  return (
    <span className="ms-3">
      {Object.entries(aggregate(props.runs)).reverse().slice(0, props.maxItems).map(([timestamp, status]) => 
        <i key={timestamp} className={`bi bi-square-fill run run-${status}`} data-toggle="tooltip" data-placement="bottom" title={formatTime(timestamp, {y: 'numeric', m: 'long', d: 'numeric'})} />
      )}
    </span>
  )
}

export default SiteHistoryBar