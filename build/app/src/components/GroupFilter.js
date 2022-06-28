import { useState } from "react"
import Group from "./Group"

const intersect = (arr1, arr2) => {
  return arr1.filter(item => arr2.includes(item));
}

const GroupFilter = (props) => {
  const [selectedGroups, setSelectedGroups] = useState(props.groups)
  
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