import { useState } from 'react'
import Page from './Page'
import Badge from './Badge'
import { formatTime } from '../helpers/time'

const getStatus = (passed, total) => {
  switch (passed) {
    case 0: return 'failed'
    case total: return 'passed'
    default: return 'pailed'
  }
}

const load = async spec => {
  const response = await fetch(`/${spec}.json`)
  const data = Object.values(await response.json())
  return data.filter(record => {
    return record.run === spec && record.type === 'SuiteResult' && record.parent === ''
  })
  .map(site => {
    site.pages = data.filter(record => {
      return record.run === spec && record.type === 'SuiteResult' && record.parent === site.id
    })
    .map(page => {
      page.tests = data.filter(record => {
        return record.run === spec && record.type === 'TestResult' && record.parent === page.id
      }) || []
      page.status = getStatus(page.tests.filter(test => test.status === 'passed').length, page.tests.length)
      return page
    }) || []
    site.status = getStatus(site.pages.filter(page => page.status === 'passed').length, site.pages.length)
    return site
  })[0]
}

function Site(props) {
  const [site, setSite] = useState({
    id: 'none',
    title: 'Unknown Site',
    pages: [],
    timestamp: 0,
  })

  
  load(props.spec)
    .then(site => {
      setSite(site)
    })

  return (
    <div className="site-item active-group shading-light justify-content-between align-items-start" aria-current="true">
      <div>
        <h2 className="site-title">
          <a data-bs-toggle="collapse" href={`#suite-content-${site.id}`}>{site.title}</a>
        </h2>
        <div className="site-meta d-flex flex-row">
        <span className="mr-3">
          <i className="bi bi-file-earmark-text"/>{site.pages.length} page{site.pages.length !== 1 && 's'}
        </span>
          <span className="ms-3">
          <i className="bi bi-clock"/>{formatTime(site.timestamp)}
        </span>
        </div>
        <div className="collapse suite-content" id={`suite-content-${site.id}`}>
          <ul>{site.pages.map(page => {
            return <li key={page.id} className="suite">
              <Page id={page.id} title={page.title} url={page.url} tests={page.tests} />
              </li>
          })}
          </ul>
        </div>
      </div>
      <Badge status={site.status} />
    </div>
  )
}

export default Site
