import Icon, { Icons } from "../UI/Icon"
import useMonitor from "../../hooks/useMonitor"
import classes from './SiteMonitor.module.css'
import { SiteStatus } from "../../helpers/siteStats"
import { useEffect } from "react"

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
  useEffect(() => {
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
      <Icon className={monitored && classes.monitored} icon={monitored ? Icons.eyeSolid : Icons.eye} />
    </div>
  )
}

export default SiteMonitor