const Badge = (props) => {
  const statusLabels = {
    passed: 'Available',
    failed: 'Unavailable',
    pailed: 'Some features unavailable'
  }
  
  return (
    <span className={`badge badge-${props.status || 'unknown'} rounded-pill`}>
      {statusLabels[props.status] || 'Unknown'}
    </span>
  )
}

export default Badge
