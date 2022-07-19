import React from "react"

export const Icons = {
  clock: 'clock',
  arrowUp: 'arrow-up',
  arrowDown: 'arrow-down',
  page: 'file-earmark-text'
}

const Iconed = (props) => {
  return (
    <React.Fragment>
      <i className={`bi bi-${props.icon}`} />
      {props.children}
    </React.Fragment>
  )
}

export default Iconed