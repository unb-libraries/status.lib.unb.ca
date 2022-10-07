import { useEffect, useState } from 'react'
import useConfig from '../hooks/useConfig'
import DynamicLayout from './Layout/DynamicLayout'
import GroupFilter from './UI/GroupFilter'
import loadReports from '../helpers/loadReports'
import SiteList from './Site/SiteList'

const Main = (props) => {
  const reportsUrl = `/data/${props.dataSource}.json`
  const [reports, setReports] = useState({sites: [], groups: []})
  const [group, setGroup] = useState(useConfig().filter)

  useEffect(() => {
    loadReports(reportsUrl).then(reports => setReports(reports))
    const interval = setInterval(async () => {
      setReports(await loadReports(reportsUrl))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [])

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