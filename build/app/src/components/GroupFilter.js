import { useReducer } from 'react'
import Group from './Group'

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
    <div>
      <div className="group-filter mb-3">
        <Group key="all" id="all" label="ALL" onClick={_ => dispatch({type: 'set', groups: props.groups, value: true})} />
        <Group key="none" id="none" label="NONE" onClick={_ => dispatch({type: 'set', groups: props.groups, value: false})} />
        {buttons}
      </div>
      {props.children.filter(child =>
        child.props.groups.some(group => selection[group])
      )}
    </div>
  )
}

export default GroupFilter
