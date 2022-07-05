const Group = props => {
  let selectedClassName = 'btn'
  if (props.selected !== undefined) {
    selectedClassName = 'btn-'.concat(props.selected ? 'primary' : 'secondary')
  }
  
  return (
    <button
      className={`btn ${selectedClassName} ms-0 mx-1`}
      onClick={props.onClick}>
      <span className="label">{props.label}</span>
    </button>
  )
}

export default Group
