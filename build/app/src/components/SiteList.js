import { useState } from 'react'
import GroupFilter from './GroupFilter'
import Site from './Site'
import { intersect } from '../helpers/array'

function SiteList() {
  const [refresh, setRefresh] = useState(true)
  const [sites, setSites] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])

  async function loadSites() {
    const response = await fetch('/reports.json')
    const reports = await response.json()
    const sites = Object.values(reports).filter(report => {
      return report.type === 'SuiteResult' && report.parent === ''
    })

    function getPages(site) {
      const pages = Object.values(reports).filter(report => {
        return report.type === 'SuiteResult' && report.parent === site.id
      })

      function getTests(page) {
        return Object.values(reports).filter(report => {
          return report.type === 'TestResult' && report.parent === page.id
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

  function toggleGroupHandler(group) {
    setSelectedGroups(() => {
      const newSelectedGroups = [...selectedGroups]
      if (group.selected) {
        newSelectedGroups.push(group.id)
      }
      else {
        newSelectedGroups.splice(newSelectedGroups.indexOf(group.id), 1)
      }
      return newSelectedGroups
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
      }, 15000)
    })
  }

  return <div>
    <GroupFilter groups={groups} selected={selectedGroups} onToggleGroup={toggleGroupHandler}/>
    <ul className="site-list list-group">
    {sites.filter(site => intersect(site.groups, selectedGroups).length > 0).map(site => {
      return <li key={site.id}>
          <Site id={site.id} title={site.title} timestamp={site.timestamp} pages={site.pages} status={site.status} />
        </li>
    })}
  </ul>
  </div>
}

export default SiteList