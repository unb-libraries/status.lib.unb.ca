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

const Icon = (props) => {
  return (
      <i className={`${(props.className ?  `${props.className} ` : '')}${classes.icon} ${props.icon}`}></i>
  )
}

export default Icon