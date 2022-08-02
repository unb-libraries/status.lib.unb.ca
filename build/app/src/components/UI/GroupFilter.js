import { useReducer, useState } from 'react'
import Group from './Group'
import classes from './GroupFilter.module.css'

const set = (groups, selected) => {
  return Object.fromEntries(groups.map(group => [group, selected]))
}

const selectionReducer = (state, action) => {
  switch(action.type) {
    case 'set':
      return set(action.groups, action.value)
    case 'toggle':
    default:
      const newState = {...state}
      newState[action.group] = state.hasOwnProperty(action.group) ? !state[action.group] : true
      return newState
  }
}

const GroupFilter = props => {
  const [selection, dispatch] = useReducer(selectionReducer, set(props.groups, true))
  const [collapsed, setCollasped] = useState(true)

  const toggleCollapsed = () => {
    setCollasped(collapsed => !collapsed)
  }

  const buttons = props.groups.map(group => {
    return (
      <Group
        key={group}
        id={group}
        label={group.toUpperCase()}
        selected={selection[group] || false}
        onClick={_ => dispatch({type: 'toggle', group: group})}
      />
    )
  })

  return (
    <div className={classes.container}>
      <div id="group-filter-menu" className={classes.group} role="group">
        <Group key="all" type="multi" label="ALL" onClick={_ => dispatch({type: 'set', groups: props.groups, value: true})} />
        <Group key="none" type="multi" label="NONE" onClick={_ => dispatch({type: 'set', groups: props.groups, value: false})} />
        <Group key="select" type="toggler" label="SELECTED" onClick={_ => toggleCollapsed()} />
      </div>

      <div className={`${classes.group} ${collapsed ? classes.collapsed : ''}`} role="group">
        {buttons}
      </div>

      {props.children.filter(child =>
        child.props.groups.some(group => selection[group])
      )}
    </div>
  )
}

export default GroupFilter
