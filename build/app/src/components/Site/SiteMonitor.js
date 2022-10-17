import Icon, { Icons } from "../UI/Icon"
import classes from './SiteMonitor.module.css'
import { SiteStatus } from "../../helpers/siteStats"
import useAfterRenderEffect from '../../hooks/useAfterRenderEffect'
import { Monitor } from '../../hooks/useMonitor'

const SiteMonitor = (props) => {
  const [monitored, toggleMonitored] = props.monitor
  const iconStyle = ((monitor) => {
    switch (monitor) {
      case Monitor.ON:
        return Icons.eyeSolid
      case Monitor.OFF:
      case Monitor.UNKNOWN:
      default:
        return Icons.eye
    }
  })(monitored)

  const clickHandler = async (event) => {
    event.stopPropagation()
      toggleMonitored()
  }

  const { status, unresolvedErrors } = props.stats
  useAfterRenderEffect(() => {
    if (monitored) {
      new Notification(props.title, {
        body: status === SiteStatus.FAIL
          ? `${unresolvedErrors} error${unresolvedErrors !== 1 ? 's' : ''}`
          : 'All errors resolved.'
      })
    }
  }, status, unresolvedErrors)

  return (
    <div onClick={clickHandler}>
      <Icon className={`${classes.icon} ${monitored && classes.monitored}`} icon={monitored ? Icons.eyeSolid : Icons.eye} />
    </div>
  )
}

export default SiteMonitor