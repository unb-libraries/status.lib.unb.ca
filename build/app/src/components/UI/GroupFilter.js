import { useState } from 'react'
import Group from './Group'
import classes from './GroupFilter.module.css'

const GroupFilter = props => {
  const [selected, setSelected] = useState('all')
  const [collapsed, setCollasped] = useState(true)

  return (
    <div className={classes.container}>
      <div id="group-filter-menu" className={classes.group} role="group">
        <Group key="select" type="toggler" label="FILTER" selected={!collapsed} onClick={_ => setCollasped(collapsed => !collapsed)} />
      </div>

      <div className={`${classes.group} ${collapsed ? classes.collapsed : ''}`} role="group">
        {['all', ...props.groups].map(group => (
          <Group key={`gf-${group}`} id={`gf-${group}`} label={group.toUpperCase()} selected={selected === group} onClick={_ => setSelected(group)}
          />
        ))}
      </div>

      {selected === 'all' ? props.children : props.children.filter(child =>
        child.props.groups.includes(selected)
      )}
    </div>
  )
}

export default GroupFilter
