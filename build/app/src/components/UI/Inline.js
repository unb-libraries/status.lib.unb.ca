import classes from './Inline.module.css'

const Inline = (props) => {
  return (
    <div className={classes.inline}>
      {props.children.map((child, index) => 
        <span key={`${props.id}-${index}`}>
          {child}
        </span>
      )}
    </div>
  )
}

export default Inline