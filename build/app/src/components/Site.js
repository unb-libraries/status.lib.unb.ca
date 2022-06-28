import SiteHistoryBar from './SiteHistoryBar'
import Page from './Page'
import Badge from './Badge'
import { formatTime } from '../helpers/time'
import { useState } from 'react'

const Site = (props) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapse = () => {
    setCollapsed((collapsed) => !collapsed)
  }

  return (
    <div className="site-item active-group shading-light justify-content-between align-items-start" aria-current="true" onClick={toggleCollapse}>
      <div>
        <h2 className="site-title">{props.title}</h2>
        <div className="site-meta d-flex flex-row">
          <span className="mr-3">
            <i className="bi bi-file-earmark-text"/>{props.pages.length} page{props.pages.length !== 1 && 's'}
          </span>
          <span className="mx-3">
            <i className="bi bi-clock"/>{formatTime(props.timestamp, {y: 'numeric', m: 'long', d: 'numeric', h: 'numeric', min: '2-digit'})}
          </span>
        </div>
        <div className={`${collapsed ? 'collapse ' : ''}suite-content`} id={`suite-content-${props.id}`}>
          <SiteHistoryBar pages={props.pages} maxItems={14}/>
          <ul>{props.pages.map(page => {
            return <li key={page.id} className="suite">
              <Page id={page.id} title={page.title} url={page.url} tests={page.tests} />
              </li>
          })}
          </ul>
        </div>
      </div>
      <Badge status={props.status} />
    </div>
  )
}

export default Site
