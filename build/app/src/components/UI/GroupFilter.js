import { useState } from 'react'
import Group from './Group'
import classes from './GroupFilter.module.css'

const GroupFilter = props => {
  const [collapsed, setCollasped] = useState(true)

  const selectGroup = (group) => {
    props.onSelect(group)
  }

  return (
    <div className={classes.container}>
      <div id="group-filter-menu" className={classes.group} role="group">
        <Group key="select" type="toggler" label="FILTER" selected={!collapsed} onClick={_ => setCollasped(collapsed => !collapsed)} />
      </div>

      <div className={`${classes.group} ${collapsed ? classes.collapsed : ''}`} role="group">
        {props.groups.map(group => (
          <Group key={`gf-${group}`} id={`gf-${group}`} label={group.toUpperCase()} selected={props.selected === group} onClick={selectGroup.bind(null, group)}/>
        ))}
      </div>
    </div>
  )
}

export default GroupFilter
