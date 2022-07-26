import React from "react"
import classes from './Group.module.css'

const Group = props => {
  return (
    <button className={`${classes.filter} ${props.selected && classes.active}`} onClick={props.onClick}>
      {props.label}
    </button>
  )
}

export default Group
