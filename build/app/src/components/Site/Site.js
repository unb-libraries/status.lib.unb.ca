import StatusIndicator from './StatusIndicator'
import { useState } from 'react'
import classes from './Site.module.css'
import Inline from '../Main/Inline'
import SiteStats from '../../helpers/siteStats'
import SiteMeta from './SiteMeta'
import SiteMonitor from './SiteMonitor'
import monitorClasses from './SiteMonitor.module.css'
import useMonitor, { Monitor } from '../../hooks/useMonitor'
import useConfig from '../../hooks/useConfig'

const Site = (props) => {
  const [collapsed, setCollapsed] = useState(true)
  const stats = SiteStats(props.pages)
  const [monitored, toggleMonitored] = useMonitor(props.id)
  const [monitorVisible, setMonitorVisible] = useState(false)
  const { monitor } = useConfig()


  const toggleCollapse = () => {
    if (props.expandable) {
      setCollapsed((collapsed) => !collapsed)
    }
  }

  const hover = () => {
    if (monitored !== Monitor.ON) {
      setMonitorVisible(visible => !visible)
    }
  }

  const status = <div className={classes.status}>
    <StatusIndicator id={props.id} title={props.title} status={stats.status} tests={stats.tests.length} errors={stats.failures} />
  </div>

  return (
    <div className={`${classes.site} ${props.expandable && classes.expandable} ${monitorClasses.site}`} aria-current="true" onClick={toggleCollapse}>
      <div className={classes.content}>
        <div className={classes.title} onMouseEnter={hover} onMouseLeave={hover}>
          <Inline>
            <h2>{props.title}</h2>
            {(monitor && (monitorVisible || monitored === Monitor.ON)) && <SiteMonitor id={props.id} title={props.title} stats={stats} monitor={[monitored, toggleMonitored]}/>}
          </Inline>
          {status}
        </div>
        <SiteMeta timestamp={props.timestamp} pages={props.pages} stats={stats} url={props.url} collapsed={collapsed} />
      </div>
      {status}
    </div>
  )
}

export default Site
