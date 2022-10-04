import React, { Fragment, useState } from "react"
import EventTarget from "../UI/EventTarget"
import Icon, { Icons } from '../UI/Icon'
import Inline from "../UI/Inline"

const SiteTitle = (props) => {
  const [iconVisible, setIconVisible] = useState(false)
  const [iconSticky, setIconSticky] = useState(false)

  const titleHoverHandler = () => {
    setIconVisible(visible => !iconSticky ? !visible : visible)
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
      const sites = JSON.parse(localStorage.getItem('monitor')) || []
      if (!iconSticky) {
        sites.push(props.title)
      }
      else {
        sites.splice(sites.findIndex(site => site === props.title), 1)
      }
      localStorage.setItem('monitor', JSON.stringify(sites))
      setIconSticky(sticky => !sticky)
    }
  }

  return (
    <EventTarget mouseenter={titleHoverHandler} mouseleave={titleHoverHandler}>
      <Inline>
        <h2>{props.title}</h2>
        <EventTarget click={iconClickHandler}>
        {(iconVisible || iconSticky) && <Icon icon={iconSticky ? Icons.eyeSolid : Icons.eye} />}
        </EventTarget>
      </Inline>
    </EventTarget>
  )
}

export default SiteTitle