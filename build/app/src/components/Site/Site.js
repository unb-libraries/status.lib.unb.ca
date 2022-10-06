import StatusIndicator from './StatusIndicator'
import { useState } from 'react'
import classes from './Site.module.css'
import SiteTitle from './SiteTitle'
import SiteStats from '../../helpers/siteStats'
import SiteMeta from './SiteMeta'

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
    <div className={`${classes.site} ${props.expandable && classes.expandable}`} aria-current="true" onClick={toggleCollapse}>
      <div className={classes.content}>
        <div className={classes.title}>
          <SiteTitle title={props.title} />
          {status}
        </div>
        <SiteMeta timestamp={props.timestamp} pages={props.pages} stats={stats} collapsed={collapsed} />
      </div>
      {status}
    </div>
  )
}

export default Site
