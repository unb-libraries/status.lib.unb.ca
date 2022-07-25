import React from "react"

const Group = props => {
  const selectedClassName = `btn-${props.selected ? 'primary' : 'outline-primary'}`
  
  return (
    <React.Fragment>
      <input type="checkbox" className={`btn-check ${selectedClassName}`} id={`group-${props.id}`} onChange={props.onClick} checked={props.selected ? 'selected' : ''} />
      <label class={`btn ${selectedClassName}`} for={`group-${props.id}`}>{props.label}</label>
    </React.Fragment>
  )
}

export default Group
