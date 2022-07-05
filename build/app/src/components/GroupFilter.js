import { useEffect, useState } from 'react'
import Group from './Group'

const GroupFilter = props => {
  const [selectedGroups, setSelectedGroups] = useState({})

  const { groups } = props
  useEffect(() => {
    const initialSelection = { ...selectedGroups }
    groups.forEach(
      group => (initialSelection[group] = initialSelection[group] || true)
    )
    setSelectedGroups(initialSelection)
  }, [props])

  function toggleGroup(group) {
    setSelectedGroups(selectedGroups => {
      const newSelectedGroups = { ...selectedGroups }
      newSelectedGroups[group] = !selectedGroups[group]
      return newSelectedGroups
    })
  }

  const buttons = props.groups.map(group => {
    return (
      <Group
        key={group}
        id={group}
        label={group.toUpperCase()}
        selected={selectedGroups[group]}
        onToggle={toggleGroup}
      />
    )
  })

  return (
    <div>
      <div className="group-filter mb-3">{buttons}</div>
      {props.children.filter(child =>
        child.props.groups.some(group => selectedGroups[group])
      )}
    </div>
  )
}

export default GroupFilter
