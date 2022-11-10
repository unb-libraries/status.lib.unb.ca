import { useCallback, useEffect, useState } from 'react'
import DynamicLayout from '../Layout/DynamicLayout'
import GroupFilter from '../Site/GroupFilter'
import SiteList from '../Site/SiteList'
import loadReports from '../../helpers/loadReports'
import SiteStats from '../../helpers/siteStats'
import useConfig from '../../hooks/useConfig'


const Main = (props) => {
  const reportsUrl = '/data/reports.json'
  const [reports, setReports] = useState({sites: [], groups: []})
  const [group, setGroup] = useState(useConfig().filter)
  
  const mapReports = useCallback((reports) => {
    setReports({
      sites: reports.sites.map(report => ({
        ...report,
        stats: SiteStats(report.pages),
      })),
      groups: reports.groups,
    })
  }, [])

  useEffect(() => {
    loadReports(reportsUrl).then(mapReports)
    const interval = setInterval(() => {
      loadReports(reportsUrl).then(mapReports)
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [mapReports])

  const filterByGroup = (sites, group) => {
    return sites.filter(site => group === 'all' || site.groups.includes(group))
  }

  return (
    <DynamicLayout>
      {reports.groups.length > 1 && <GroupFilter groups={['all', ...reports.groups]} selected={group} onSelect={group => setGroup(group)}/>}
      <SiteList sites={filterByGroup(reports.sites, group)} emptyMessage={props.emptyMessage} />
    </DynamicLayout>
  )
}

export default Main