import { useState } from 'react'
import GroupFilter from './GroupFilter'
import Site from './Site'


function SiteList() {
  const [refresh, setRefresh] = useState(true)
  const [sites, setSites] = useState([])
  const [groups, setGroups] = useState([])

  async function loadSites() {
    const response = await fetch('/reports.json')
    const reports = await response.json()
    const sites = Object.values(reports).filter(report => {
      return report.type === 'site'
    })

    function getPages(site) {
      const pages = Object.values(reports).filter(report => {
        return report.type === 'page' && report.site === site.id
      })

      function getTests(page) {
        return Object.values(reports).filter(report => {
          return report.type === 'test' && report.page === page.id
        }) || []
      }

      return pages.map(page => {
        page.tests = getTests(page)
        page.status = getStatus(page.tests.filter(test => test.status === 'passed').length, page.tests.length)
        return page
      })
    }

    function getStatus(passed, total) {
      switch (passed) {
        case 0: return 'failed'
        case total: return 'passed'
        default: return 'pailed'
      }
    }

    return sites.map(site => {
        site.pages = getPages(site)
        site.status = getStatus(site.pages.filter(page => page.status === 'passed').length, site.pages.length)
        return site
    })
  }

  if (refresh) {
    loadSites().then(sites => {
      setSites(sites)
      setGroups([].concat(...sites.map(site => {
        return site.groups
      })).filter((group, index, groups) => {
        return groups.indexOf(group) === index
      }))
      setRefresh(false)
      setTimeout(() => {
        setRefresh(true)
      }, 60000)
    })
  }

  return <div>
    {sites.length > 0 &&
      <ul className="site-list list-group">
        <GroupFilter groups={groups}>
          {sites.map(site => 
            <li key={site.id} groups={site.groups}>
              <Site id={site.id} title={site.title} timestamp={site.timestamp} pages={site.pages} status={site.status} />
            </li>
          )}
        </GroupFilter>
      </ul>
    }
  </div>
}

export default SiteList