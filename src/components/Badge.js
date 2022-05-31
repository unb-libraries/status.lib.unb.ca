function Badge(props) {
  const statusLabels = {
    passed: 'Available',
    failed: 'Unavailable',
    pailed: 'Some features unavailable'
  }
  
  return (
    <span className={`badge badge-${props.status} rounded-pill`}>
      {statusLabels[props.status] || 'Unknown'}
    </span>
  )
}

export default Badge
