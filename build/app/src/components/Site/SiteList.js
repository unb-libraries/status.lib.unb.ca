import { useState } from 'react'
import DynamicLayout from '../Layout/DynamicLayout'
import GroupFilter from '../UI/GroupFilter'
import Site from './Site'
import { useSearchParams } from 'react-router-dom'
import classes from './SiteList.module.css'

const titleSort = (site, anotherSite) => {
  return site.title > anotherSite.title ? 1 : (site.title < anotherSite.title ? -1 : 0)
}

const SiteList = (props) => {
  const [params] = useSearchParams()
  const expandable = ['', '1', 'true'].includes(params.get('expandable'))

  const [refresh, setRefresh] = useState(true)
  const [sites, setSites] = useState([])
  const [groups, setGroups] = useState([])

  async function loadSites() {
    const response = await fetch(`/data/${props.dataSource}.json`)
    return (await response.json()).map(site => {
      site.status = site.pages.some(
        page => page.tests.some(
          test => test.status === 'failed'
        )
      ) ? 'failed' : 'passed'
      return site
    })
  }

  if (refresh) {
    loadSites().then(sites => {
      sites.sort(titleSort)
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

  return (
    <DynamicLayout>
      {sites.length > 0 &&
        <ul className={classes['site-list']}>
          <GroupFilter groups={groups}>
            {sites.map(site => 
              <li key={site.id} groups={site.groups}>
                <Site id={site.id} title={site.title} url={site.url} timestamp={site.time} pages={site.pages} runs={site.runs} status={site.status} expandable={expandable} />
              </li>
            )}
          </GroupFilter>
        </ul>
      }
      {sites.length <= 0 && <div>{props.emptyMessage}</div>}
    </DynamicLayout>
  )
}

export default SiteList