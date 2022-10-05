import React, { useState } from "react"
import useMonitor from "../../hooks/useMonitor"
import EventTarget from "../UI/EventTarget"
import Icon, { Icons } from '../UI/Icon'
import Inline from "../UI/Inline"

const SiteTitle = (props) => {
  const [iconVisible, setIconVisible] = useState(false)
  const [monitored, toggleMonitored] = useMonitor(props.title)

  const titleHoverHandler = () => {
    setIconVisible(visible => !monitored ? !visible : visible)
  }

  const hasPermission = async () => {
    switch (Notification.permission) {
      case 'denied': return false
      case 'granted': return true
      case 'default': return await Notification.requestPermission(permission => permission)
    }
  }

  const iconClickHandler = async (event) => {
    event.stopPropagation()
    if (await hasPermission()) {
      toggleMonitored()
    }
  }

  return (
    <EventTarget mouseenter={titleHoverHandler} mouseleave={titleHoverHandler}>
      <Inline>
        <h2>{props.title}</h2>
        <EventTarget click={iconClickHandler}>
        {(iconVisible || monitored) && <Icon icon={monitored ? Icons.eyeSolid : Icons.eye} />}
        </EventTarget>
      </Inline>
    </EventTarget>
  )
}

export default SiteTitle