import SiteHistoryBar from './SiteHistoryBar'
import PageList from './PageList'
import StatusIndicator from './StatusIndicator'
import { useState } from 'react'
import DateTimestamp from './DateTimestamp'
import Icon, { Icons } from '../UI/Icon'
import Inline from '../UI/Inline'
import classes from './Site.module.css'
import SiteTitle from './SiteTitle'

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

  const siteRuns = () => [].concat(...props.pages.map(page => [].concat(...page.tests.map(test => test.runs))))
  const siteErrors = [].concat(...props.pages.map(page => [].concat(...page.tests.map(test => test.errors))))

  const status = <div className={classes.status}>
    <StatusIndicator status={props.status} tests={testTotal} errors={errorTotal} />
  </div>

  return (
    <div className={`${classes.site} ${props.expandable && classes.expandable}`} aria-current="true" onClick={toggleCollapse}>
      <div className={classes.content}>
        <div className={classes.title}>
          <SiteTitle title={props.title} />
          {status}
        </div>
        <Inline itemClassName={classes.meta}>
          <Inline><Icon icon={Icons.page}/><span>{props.pages.length} page{props.pages.length !== 1 && 's'}</span></Inline>
          <Inline><Icon icon={Icons.clock}/><DateTimestamp milliseconds={props.timestamp} elapsed={true} text={'{} ago'} altText={'Less than a minute'} /></Inline>
          <Inline>
            <Icon icon={props.status === 'passed' ? Icons.arrowUp : Icons.arrowDown} />
            {siteErrors.length > 0 
              ? props.status === 'passed'
                ? <DateTimestamp milliseconds={Math.max(...siteErrors.map(error => error.resolved))} elapsed={true} text={'No errors for {}'} altText={'Less than a minute'}/>
                : <DateTimestamp milliseconds={Math.max(...siteErrors.map(error => error.occurred))} elapsed={true} text={'Failing for {}'} altText={'Less than a minute'}/>
              : props.status === 'passed'
                ? <DateTimestamp milliseconds={Math.min(...siteRuns())} elapsed={true} text={'No errors for at least {}'} altText={'Less than a minute'} />
                : <DateTimestamp milliseconds={Math.min(...siteRuns())} elapsed={true} text={'Failing for at least {}'} altText={'Less than a minute'} />
            }
          </Inline>
        </Inline>
        {(props.expandable && !collapsed) && (
          <div>
            <SiteHistoryBar siteId={props.id} pages={props.pages} maxItems={14}/>
            <PageList pages={props.pages} siteUrl={props.url}/>
          </div>
        )}
      </div>
      {status}
    </div>
  )
}

export default Site
