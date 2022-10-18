import Icon, { Icons } from "../UI/Icon"
import classes from './SiteMonitor.module.css'
import { SiteStatus } from "../../helpers/siteStats"
import useAfterRenderEffect from '../../hooks/useAfterRenderEffect'
import { Monitor } from '../../hooks/useMonitor'
import { sendNotification } from "../../helpers/notification"

const SiteMonitor = (props) => {
  const [monitored, toggleMonitored] = props.monitor
  const iconStyle = ((monitor) => {
    switch (monitor) {
      case Monitor.DISABLED:
        return Icons.eyeDisabled
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
      sendNotification(props.title, {
        body: status === SiteStatus.FAIL
          ? `${unresolvedErrors} error${unresolvedErrors !== 1 ? 's' : ''}`
          : 'All errors resolved.'
      })
    }
  }, status, unresolvedErrors)

  return (
    <div onClick={clickHandler}>
      <Icon className={`${classes.icon} ${monitored === Monitor.DISABLED && classes.disabled}`} icon={iconStyle} />
    </div>
  )
}

export default SiteMonitor