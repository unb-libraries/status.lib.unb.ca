import React, { Fragment, useState } from "react"
import EventTarget from "../UI/EventTarget"
import Icon, { Icons } from '../UI/Icon'
import Inline from "../UI/Inline"

const SiteTitle = (props) => {
  const [iconVisible, setIconVisible] = useState(false)
  const [iconSticky, setIconSticky] = useState(false)
  const [icon, setIcon] = useState(Icons.eye)

  const titleHoverHandler = () => {
    setIconVisible(visible => !iconSticky ? !visible : visible)
  }

  const iconClickHandler = (event) => {
    event.stopPropagation()
    setIconSticky(sticky => !sticky)
    setIcon(iconSticky ? Icons.eye : Icons.eyeSolid)
  }

  return (
    <EventTarget mouseenter={titleHoverHandler} mouseleave={titleHoverHandler}>
      <Inline>
        <h2>{props.title}</h2>
        <EventTarget click={iconClickHandler}>
        {(iconVisible || iconSticky) && <Icon icon={icon} />}
        </EventTarget>
      </Inline>
    </EventTarget>
  )
}

export default SiteTitle