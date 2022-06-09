function SiteHistoryBar(props) {
  return (
    <span className="ms-3">
      {Object
        .entries(props.runs)
        .slice(-props.maxItems)
        .map(([timestamp, status]) => 
          <i key={timestamp} className={`bi bi-square-fill run run-${status}`} />
        )
      }
    </span>
  )
}

export default SiteHistoryBar