const Group = props => {
  const selectedClassName = props.selected ? 'primary' : 'secondary'
  return (
    <button
      className={`btn btn-${selectedClassName} ms-0 mx-1`}
      onClick={props.onToggle.bind(null, props.id)}>
      <span className="label">{props.label}</span>
    </button>
  )
}

export default Group
