const Page = (props) => {
  const urlClickHandler = (event) => {
    event.stopPropagation()
  }

  return (
    <div>
      <h3 className="page-title">{props.title}</h3>
      {props.href && <a className="page-url" href={props.href} target="_blank" onClick={urlClickHandler}>{props.href}</a>}
      <ul>
        {props.tests.map(test => {
          return <li key={test.id} className={`test test-${test.status}`}>
            {test.title}
          </li>
        })}
      </ul>
    </div>
  )
}

export default Page