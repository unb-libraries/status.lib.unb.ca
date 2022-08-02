import { useState } from 'react'
import Iconed, { Icons } from '../UI/Icon'
import Tooltip from '../UI/Tooltip'
import { DateTime, DateTimeFormat, Duration } from '../../helpers/time'
import classes from './SiteHistoryBarItem.module.css'
import { tooltipClasses } from '../UI/Tooltip'

const SiteHistoryBarItem = (props) => {
  const status = props.errors === undefined
    ? 'status-unknown' 
    : props.errors.length === 0 
      ? 'status-passed'
      : 'status-failed'

  const endOfDay = +props.date + 86399999
  const tooltipContent = (
    <div>
      <h4>{DateTime.fromTimestamp(+props.date).format(DateTimeFormat.DATE)}</h4>
      <div>{props.errors !== undefined ? `Total errors: ${props.errors.length}` : 'Did not run'}</div>
      {props.errors && props.errors.length > 0 ? (
        <table className={classes['error-table']}>
          <thead><tr><th>Page</th><th>Test</th><th>Occurred</th><th>Resolved</th><th>Duration</th></tr></thead>
          <tbody>
          {props.errors.map(error => 
            <tr key={`${error.type}-${error.occurred}`}>
              <td>{error.page.title.length <= 20 ? error.page.title : `${error.page.title.slice(0, 20)}...`}</td>
              <td>{error.test.title.length <= 30 ? error.test.title : `${error.test.title.slice(0, 30)}...`}</td>
              <td>{DateTime.fromTimestamp(Math.max(+error.occurred, +props.date)).format(DateTimeFormat.TIME)}</td>
              <td>{error.resolved && error.resolved <= endOfDay ? DateTime.fromTimestamp(error.resolved).format(DateTimeFormat.TIME) : ''}</td>
              <td>{Duration.fromMilliseconds((error.resolved ? Math.min(+error.resolved, endOfDay) : Math.min(endOfDay, DateTime.now().toMilliseconds())) - Math.max(+error.occurred, +props.date)).format()}</td>
            </tr>
          )}
          </tbody>
        </table>
      ) : ''}
    </div>
  )

  const [tooltipVisible, setTooltipVisiblt] = useState(false)
  const tooltipToggler = (visible) => {
    setTooltipVisiblt(visible)
  }

  return (
    <div className={`${tooltipClasses.tooltipTarget} ${classes['site-history-item']} ${classes[status]}`} onClick={e => e.stopPropagation()} onMouseEnter={tooltipToggler.bind(null, true)} onMouseLeave={tooltipToggler.bind(null, false)}>
      <Iconed icon={Icons.square} />
      {tooltipVisible && <Tooltip content={tooltipContent} />}
    </div>
  )
}

export default SiteHistoryBarItem