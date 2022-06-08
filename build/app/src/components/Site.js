import Page from './Page'
import Badge from './Badge'
import { formatTime } from '../helpers/time'

function Site(props) {
  return (
    <div className="site-item active-group shading-light justify-content-between align-items-start" aria-current="true">
      <div>
        <h2 className="site-title">
          <a data-bs-toggle="collapse" href={`#suite-content-${props.id}`}>{props.title}</a>
        </h2>
        <div className="site-meta d-flex flex-row">
        <span className="mr-3">
          <i className="bi bi-file-earmark-text"/>{props.pages.length} page{props.pages.length !== 1 && 's'}
        </span>
        <span className="mx-3">
          <i className="bi bi-clock"/>{formatTime(props.timestamp)}
        </span>
        <span className="ms-3">
          {Object.values(props.runs).map((status, index) => <i key={Object.keys(props.runs)[index]} className={`bi bi-square-fill run run-${status}`} />)}
        </span>
        </div>
        <div className="collapse suite-content" id={`suite-content-${props.id}`}>
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
