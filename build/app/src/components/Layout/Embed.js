import React from "react"

const Embed = (props) => {
  return (
    <React.Fragment>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      {props.children}
    </React.Fragment>
  )
}

export default Embed