import StatusIndicator from './StatusIndicator'
import { useState } from 'react'
import classes from './Site.module.css'
import Inline from '../Main/Inline'
import SiteMeta from './SiteMeta'
import SiteMonitor from './SiteMonitor'
import useMonitor, { Monitor } from '../../hooks/useMonitor'
import useConfig from '../../hooks/useConfig'

const Site = (props) => {
  const [collapsed, setCollapsed] = useState(true)
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

  const { status, tests, failures} = props.stats
  const statusIndicator = <div className={classes.status}>
    <StatusIndicator id={props.id} title={props.title} status={status} tests={tests.length} errors={failures} />
  </div>

  return (
    <div className={`${classes.site} ${props.expandable ? classes.expandable : ''}`} aria-current="true" onClick={toggleCollapse}>
      <div className={classes.content}>
        <div className={classes.title} onMouseEnter={hover} onMouseLeave={hover}>
          <Inline>
            <h2>{props.title}</h2>
            {(monitor && (monitorVisible || monitored === Monitor.ON)) && <SiteMonitor id={props.id} title={props.title} stats={props.stats} monitor={[monitored, toggleMonitored]}/>}
          </Inline>
          {statusIndicator}
        </div>
        <SiteMeta timestamp={props.timestamp} pages={props.pages} stats={props.stats} url={props.url} collapsed={collapsed} />
      </div>
      {statusIndicator}
    </div>
  )
}

export default Site
