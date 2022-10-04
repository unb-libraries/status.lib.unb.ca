const EventTarget = (props) => {
  const handler = (event) => {
    if (props[event.type]) {
      props[event.type](event)
    }
  }
  return (
    <div 
      onClick={handler}
      onMouseEnter={handler}
      onMouseLeave={handler}
    >
      {props.children}
    </div>
  )
}

export default EventTarget