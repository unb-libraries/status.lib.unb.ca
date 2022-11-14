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

  const { group: defaultGroup } = useConfig()
  const [group, setGroup] = useState(defaultGroup)
  
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

  let sites = reports.sites
  if (group !== 'all') {
    sites = sites.filter(site => site.groups.includes(group))
  }

  return (
    <DynamicLayout>
      {reports.groups.length > 1 && <GroupFilter groups={['all', ...reports.groups]} selected={group} onSelect={group => setGroup(group)}/>}
      <SiteList sites={sites} emptyMessage={props.emptyMessage} />
    </DynamicLayout>
  )
}

export default Main