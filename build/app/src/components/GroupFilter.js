import Group from "./Group"

function GroupFilter(props) {
  
  function toggleGroup(group) {
    if (props.onToggleGroup) {
      props.onToggleGroup(group)
    }
  }

  return (
    <div className="group-filter">{props.groups.map(group => {
      return <Group key={group} id={group} label={group.toUpperCase()} selected={props.selected.includes(group)} onToggle={toggleGroup} />
    })}</div>
  )
}

export default GroupFilter