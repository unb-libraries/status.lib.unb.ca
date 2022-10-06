import Icon, { Icons } from "../UI/Icon"
import useMonitor from "../../hooks/useMonitor"
import classes from './SiteMonitor.module.css'
import { SiteStatus } from "../../helpers/siteStats"
import useAfterRenderEffect from '../../hooks/useAfterRenderEffect'

const SiteMonitor = (props) => {
  const [monitored, toggleMonitored] = useMonitor(props.id)

  const hasPermission = async () => {
    switch (Notification.permission) {
      case 'denied': return false
      case 'granted': return true
      case 'default': return await Notification.requestPermission(permission => permission)
    }
  }

  const clickHandler = async (event) => {
    event.stopPropagation()
    if (await hasPermission()) {
      toggleMonitored()
    }
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