const Badge = (props) => {
  const successRate = 100 - Math.abs(props.errors / props.tests * 100)
  const level = [20, 60, 99, 100].find(level => successRate <= level)

  return (
    <span className={`badge badge-${level} rounded-pill`}>
      {props.errors > 0 ? props.errors : 'No'} error{props.errors !== 1 && 's'}
    </span>
  )
}

export default Badge
