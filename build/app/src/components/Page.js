function Page(props) {
  return (
    <div>
      <h3 className="page-title">{props.title}</h3>
      {props.url && <a className="page-url" href={props.url} target="_blank">{props.url}</a>}
      <ul>{props.tests.map(test => {
        return <li key={test.id} className={`test test-${test.status}`}>
          {test.title}
          {test.error && <div>{test.error}</div>}
        </li>
      })}</ul>
    </div>
  )
}

export default Page