import React from "react"
import classes from './Icon.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const Icons = {
  arrowUp: 'bi-arrow-up',
  arrowDown: 'bi-arrow-down',
  arrowReturn: 'bi-arrow-return-right',
  checkYes: 'bi-check-circle-fill',
  checkNo: 'bi-x-circle-fill',
  clock: 'bi-clock',
  page: 'bi-file-earmark-text',
  square: 'bi-square-fill'
}

const Iconed = (props) => {
  return (
    <React.Fragment>
      <i className={`${(props.className ?  `${props.className} ` : '')}${classes.icon} ${props.icon}`}></i>
      <span>{props.children}</span>
    </React.Fragment>
  )
}

export default Iconed