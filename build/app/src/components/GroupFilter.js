import { useState } from "react"
import Group from "./Group"

function GroupFilter(props) {
  const [selectedGroups, setSelectedGroups] = useState(props.groups)

  function toggleGroup(group) {
    setSelectedGroups(() => {
      const newSelectedGroups = selectedGroups
      if (group.selected) {
        newSelectedGroups.push(group.id)
      }
      else {
        newSelectedGroups.splice(newSelectedGroups.indexOf(group.id), 1)
      }
      console.log(newSelectedGroups)
      return newSelectedGroups
    })
  }

  return (
    <div className="group-filter">{props.groups.map(group => {
      return <Group key={group} id={group} label={group.toUpperCase()} selected={selectedGroups.includes(group)} onToggle={toggleGroup} />
    })}</div>
  )
}

export default GroupFilter