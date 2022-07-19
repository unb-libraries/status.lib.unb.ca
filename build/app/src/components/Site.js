import SiteHistoryBar from './SiteHistoryBar'
import Page from './Page'
import Badge from './Badge'
import { useState } from 'react'
import DateTimestamp from './DateTimestamp'
import Iconed, { Icons } from './UI/Icon'
import Inline from './UI/Inline'

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

  return (
    <div className="site-item active-group shading-light justify-content-between align-items-start" aria-current="true" onClick={toggleCollapse}>
      <div>
        <h2 className="site-title">{props.title}</h2>
        <Inline>
          <Iconed icon={Icons.page}><span>{props.pages.length} page{props.pages.length !== 1 && 's'}</span></Iconed>
          <Iconed icon={Icons.clock}><DateTimestamp milliseconds={props.timestamp} elapsed={true} text={'{} ago'} altText={'Less than a minute'} /></Iconed>
          {siteErrors.length > 0 
            ? props.status === 'passed'
              ? <Iconed icon={Icons.arrowUp}><DateTimestamp milliseconds={Math.max(...siteErrors.map(error => error.resolved))} elapsed={true} text={'No errors for {}'} altText={'Less than a minute'} /></Iconed>
              : <Iconed icon={Icons.arrowDown}><DateTimestamp milliseconds={Math.max(...siteErrors.map(error => error.occurred))} elapsed={true} text={'Failing for {}'} altText={'Less than a minute'}/></Iconed>
            : props.status === 'passed'
              ? <Iconed icon={Icons.arrowUp}><DateTimestamp milliseconds={Math.min(...siteRuns())} elapsed={true} text={'No errors for at least {}'} altText={'Less than a minute'} /></Iconed>
              : <Iconed icon={Icons.arrowDown}><DateTimestamp milliseconds={Math.min(...siteRuns())} elapsed={true} text={'Failing for at least {}'} altText={'Less than a minute'} /></Iconed>
          }
        </Inline>
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
