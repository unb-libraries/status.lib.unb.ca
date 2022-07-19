const Inline = (props) => {
  return (
    <div className="site-meta d-flex flex-row">
      {props.children.map((child, index) => 
        <span className={index === 0 ? 'mr-3' : 'mx-3'}>
          {child}
        </span>
      )}
    </div>
  )
}

export default Inline