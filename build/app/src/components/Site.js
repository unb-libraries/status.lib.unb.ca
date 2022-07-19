import SiteHistoryBar from './SiteHistoryBar'
import Page from './Page'
import Badge from './Badge'
import { DateTime, Interval } from '../helpers/time'
import { useState } from 'react'
import Icon, { IconTypes } from './UI/Icon'

const Site = (props) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapse = () => {
    setCollapsed((collapsed) => !collapsed)
  }

  const testTotal = props.pages.reduce((count, page) => count + page.tests.length, 0)
  const errorTotal = props.pages.reduce(
    (errors, page) => errors + page.tests.filter(
      test => test.status === 'failed'
    ).length, 
  0)

  const elapsedTime = Interval
    .untilNow(DateTime.fromTimestamp(props.timestamp))
    .duration()
    .format()

  let latestStatusChangeTimestamp = undefined
  const siteErrors = [].concat(...props.pages.map(page => {
    return [].concat(...page.tests.map(test => test.errors))
  }))
  if (props.status === 'passed') {
    const sortByResolved = (err1, err2) => err1.resolved - err2.resolved
    if (siteErrors.length > 0) {
      latestStatusChangeTimestamp = siteErrors.sort(sortByResolved)[0].resolved
    }
  }
  else {
    const sortByOccurred = (err1, err2) => err1.occurred - err2.occurred
    if (siteErrors.length > 0) {
      latestStatusChangeTimestamp = siteErrors.sort(sortByOccurred)[0].occurred
    }
  }

  if (latestStatusChangeTimestamp === undefined) {
    const siteRuns = [].concat(...props.pages.map(page => [].concat(...page.tests.map(test => test.runs))))
    latestStatusChangeTimestamp = Math.min(...siteRuns)
  }

  const latestStatusChangeTime = DateTime.fromTimestamp(latestStatusChangeTimestamp)
  const durationSinceLastStatusChange = Interval.untilNow(latestStatusChangeTime)
    .duration()
    .format()

  return (
    <div className="site-item active-group shading-light justify-content-between align-items-start" aria-current="true" onClick={toggleCollapse}>
      <div>
        <h2 className="site-title">{props.title}</h2>
        <div className="site-meta d-flex flex-row">
          <span className="mr-3">
            <Icon type={IconTypes.page} />{props.pages.length} page{props.pages.length !== 1 && 's'}
          </span>
          <span className="mx-3">
            <Icon type={IconTypes.clock} />{elapsedTime}
          </span>
          <span className="mx-3">
            <Icon type={props.status === 'passed' ? IconTypes.arrowUp : IconTypes.arrowDown} />{durationSinceLastStatusChange}
          </span>
        </div>
        <div className={`${collapsed ? 'collapse ' : ''}suite-content`} id={`suite-content-${props.id}`}>
          <SiteHistoryBar pages={props.pages} maxItems={14}/>
          <ul>{props.pages.map(page => {
            return <li key={page.id} className="suite">
              <Page id={page.id} title={page.title} href={`${props.url}${page.path}`} tests={page.tests} />
              </li>
          })}
          </ul>
        </div>
      </div>
      <Badge status={props.status} tests={testTotal} errors={errorTotal}/>
    </div>
  )
}

export default Site
