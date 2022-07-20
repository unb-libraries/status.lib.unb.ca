import { useState } from 'react'
import Iconed, { Icons } from './UI/Icon'
import Tooltip from './UI/Tooltip'
import { formatTime } from '../helpers/time'

const SiteHistoryBarItem = (props) => {
  const className = props.errors === undefined
    ? 'run run-unknown' 
    : props.errors === 0 
      ? 'run run-passed' 
      : 'run run-failed'
  
  const date = formatTime(props.date, {y: 'numeric', m: 'long', d: 'numeric'})
  const tooltipText = props.errors !== undefined
    ? `${date}: ${props.errors} error${props.errors !== 1 ? 's' : ''}`
    : `${date}: Did not run`

  const [tooltipVisible, setTooltipVisiblt] = useState(false)
  const tooltipToggler = (visible) => {
    setTooltipVisiblt(visible)
  }

  return (
    <div className='tooltip-target' onMouseEnter={tooltipToggler.bind(null, true)} onMouseLeave={tooltipToggler.bind(null, false)}>
      <Iconed icon={Icons.square} className={className} />
      {tooltipVisible && <Tooltip content={tooltipText} />}
    </div>
  )
}

export default SiteHistoryBarItem