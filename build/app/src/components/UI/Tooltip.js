import classes from './Tooltip.module.css'

const Tooltip = (props) => {
  return (
    <div className={classes['tooltip-box']}>{props.content}</div>
  )
}

export default Tooltip
export const tooltipClasses = {
  tooltipTarget: classes['tooltip-target']
}