import classes from './Badge.module.css'

const Badge = (props) => {
  return (
    <span className={`${props.className ? props.className + ' ' : ''}${classes.badge}`}>
      {props.title}
    </span>
  )
}

export default Badge