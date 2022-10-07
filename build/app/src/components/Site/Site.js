import StatusIndicator from './StatusIndicator'
import { useState } from 'react'
import classes from './Site.module.css'
import Inline from '../Main/Inline'
import SiteStats from '../../helpers/siteStats'
import SiteMeta from './SiteMeta'
import SiteMonitor from './SiteMonitor'
import monitorClasses from './SiteMonitor.module.css'

const Site = (props) => {
  const [collapsed, setCollapsed] = useState(true)
  const stats = SiteStats(props.pages)

  const toggleCollapse = () => {
    if (props.expandable) {
      setCollapsed((collapsed) => !collapsed)
    }
  }

  const status = <div className={classes.status}>
    <StatusIndicator id={props.id} title={props.title} status={stats.status} tests={stats.tests.length} errors={stats.failures} />
  </div>

  return (
    <div className={`${classes.site} ${props.expandable && classes.expandable} ${monitorClasses.site}`} aria-current="true" onClick={toggleCollapse}>
      <div className={classes.content}>
        <div className={classes.title}>
          <Inline>
            <h2>{props.title}</h2>
            <SiteMonitor id={props.id} title={props.title} stats={stats}/>
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
