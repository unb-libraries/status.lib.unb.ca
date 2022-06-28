import { setTime, formatTime } from "../helpers/time"

const SiteHistoryBar = (props) => {

  const errors = props.pages.reduce(
    (siteErrors, page) => siteErrors.concat(...page.tests.reduce(
      (pageErrors, test) => pageErrors.concat(...test.errors), 
    [])), 
  [])

  const runs = props.pages.reduce(
    (siteRuns, page) => siteRuns.concat(...page.tests.reduce(
      (pageRuns, test) => pageRuns.concat(...test.runs), 
    [])), 
  [])

  const today = setTime(Date.now(), 0, 0, 0)
  const dates = Array(props.maxItems).fill().map((_, index) => {
    const date = new Date(today.getTime())
    date.setDate(date.getDate() - index)
    return date.getTime()
  })

  const history = {}
  dates.forEach(date => history[date] = undefined)
  runs.forEach(runDate => history[runDate] = 0)
  errors.forEach(error => {
    const errorDate = setTime(error.occurred, 0, 0, 0).getTime()
    if (!history[errorDate]) {
      history[errorDate] = 0
    }
    history[errorDate]++
  })

  const items = Object.entries(history).map(([timestamp, errors]) => {
    const date = formatTime(timestamp, {y: 'numeric', m: 'long', d: 'numeric'})
    const tooltipText = errors !== undefined
      ? `${date}: ${errors} error${errors !== 1 ? 's' : ''}`
      : `${date}: Did not run`
    return <i key={timestamp} className={`bi bi-square-fill run run-${errors === undefined ? 'unknown' : (errors === 0 ? 'passed' : 'failed')}`} data-toggle="tooltip" data-placement="bottom" title={tooltipText} />
  })

  return (
    <span className="site-history ms-3">{items}</span>
  )
}

export default SiteHistoryBar