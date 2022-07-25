import { setTime } from "../../helpers/time"
import SiteHistoryBarItem from "./SiteHistoryBarItem"

const SiteHistoryBar = (props) => {

  const errors = props.pages.reduce(
    (siteErrors, page) => siteErrors.concat(...page.tests.reduce(
      (pageErrors, test) => pageErrors.concat(...test.errors.map(error => {
        error.test = test
        return error
      })), 
    []).map(error => {
      error.page = page
      return error
    })), 
  [])

  const runs = props.pages.reduce(
    (siteRuns, page) => siteRuns.concat(...page.tests.reduce(
      (pageRuns, test) => pageRuns.concat(...test.runs), 
    [])), 
  [])

  const now = Date.now()
  const today = setTime(now, 0, 0, 0)
  const dates = Array(props.maxItems).fill().map((_, index) => {
    const date = new Date(today.getTime())
    date.setDate(date.getDate() - index)
    return date.getTime()
  })

  const history = {}
  dates.forEach(date => history[date] = undefined)
  runs.forEach(runDate => history[runDate] = [])
  errors.forEach(error => {
    let occurredDate = setTime(error.occurred, 0, 0, 0).getTime()
    const resolvedDate = setTime(error.resolved || now, 0, 0, 0).getTime()

    while (occurredDate <= resolvedDate) {
      if (history[occurredDate] !== undefined) {
        history[occurredDate].push(error)
      }
      occurredDate += 86400000
    }
  })

  return (
    <span className="site-history ms-3">
      {Object.entries(history).reverse().map(([timestamp, errors]) => {
        return <SiteHistoryBarItem key={`sh-item-${props.siteId}-${timestamp}`} date={timestamp} errors={errors} />
      })}
    </span>
  )
}

export default SiteHistoryBar