function GroupFilter(props) {
  return (
    props.groups.length > 1 &&
    <div className="group-filter">{props.groups.map(group => {
      return <button key={group} className="btn btn-primary mx-1">{group}</button>
    })}</div>
  )
}

export default GroupFilter