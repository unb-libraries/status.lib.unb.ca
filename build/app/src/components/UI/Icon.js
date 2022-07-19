export const IconTypes = {
  clock: 'clock',
  arrowUp: 'arrow-up',
  arrowDown: 'arrow-down',
  page: 'file-earmark-text'
}

const Icon = (props) => {
  return <i className={`bi bi-${props.type}`} />
}

export default Icon