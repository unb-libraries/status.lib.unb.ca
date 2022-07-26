import Badge from "../UI/Badge"
import classes from './StatusIndicator.module.css'

const StatusIndicator = (props) => {
  const successRate = 100 - Math.abs(props.errors / props.tests * 100)
  const level = [20, 60, 99, 100].find(level => successRate <= level)
  const title = `${props.errors > 0 ? props.errors : 'No'} error${props.errors !== 1 ? 's' : ''}`

  return <Badge className={classes[`status-${level}`]} title={title} />
}

export default StatusIndicator
