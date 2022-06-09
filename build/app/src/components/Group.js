import { useState } from 'react'

function Group(props) {
  const [selected, setSelected] = useState(props.selected !== undefined ? props.selected : true)

  function clickHandler() {
    setSelected(!selected)
    if (props.onToggle) {
      props.onToggle({
        ...props,
        selected: !selected
      })
    }
  }

  return (
    <button className={`btn btn-${selected ? 'primary' : 'secondary'} ms-0 mx-1`} onClick={clickHandler}>
      <span className="label">{props.label}</span>
    </button>
  )
}

export default Group