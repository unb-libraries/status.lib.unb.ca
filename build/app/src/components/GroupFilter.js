import { useState } from "react"
import Group from "./Group"
import { intersect } from '../helpers/array'

function GroupFilter(props) {
  const [selectedGroups, setSelectedGroups] = useState([])
  
  function toggleGroup(group) {
    setSelectedGroups(() => {
      const newSelectedGroups = [...selectedGroups]
      if (group.selected) {
        newSelectedGroups.push(group.id)
      }
      else {
        newSelectedGroups.splice(newSelectedGroups.indexOf(group.id), 1)
      }
      return newSelectedGroups
    })
  }

  return (
    <div>
      <div className="group-filter mb-3">{props.groups.map(group => {
        return <Group key={group} id={group} label={group.toUpperCase()} selected={selectedGroups.includes(group)} onToggle={toggleGroup} />
      })}</div>
      {props.children.filter(child => intersect(child.props.groups, selectedGroups).length > 0)}
    </div>
  )
}

export default GroupFilter