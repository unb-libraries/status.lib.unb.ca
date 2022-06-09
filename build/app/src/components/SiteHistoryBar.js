import { formatTime } from "../helpers/time"

function SiteHistoryBar(props) {
  return (
    <span className="ms-3">
      {Object
        .entries(props.runs)
        .slice(-props.maxItems)
        .map(([timestamp, status]) => 
          <i key={timestamp} className={`bi bi-square-fill run run-${status}`} data-toggle="tooltip" data-placement="bottom" title={formatTime(timestamp)} />
        )
      }
    </span>
  )
}

export default SiteHistoryBar