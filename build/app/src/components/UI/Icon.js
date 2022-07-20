import React from "react"

export const Icons = {
  arrowUp: 'arrow-up',
  arrowDown: 'arrow-down',
  clock: 'clock',
  page: 'file-earmark-text',
  square: 'square-fill'
}

const Iconed = (props) => {
  return (
    <React.Fragment>
      <i className={`bi bi-${props.icon}${props.className ? ' ' + props.className : ''}`} />
      {props.children}
    </React.Fragment>
  )
}

export default Iconed