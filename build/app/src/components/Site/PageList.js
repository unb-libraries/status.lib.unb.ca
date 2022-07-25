import Page from "./Page"

const PageList = (props) => {
  return (
    <ul>
      {props.pages.map(page => (
        <li key={page.id} className="suite">
          <Page id={page.id} title={page.title} href={`${props.siteUrl}${page.path}`} tests={page.tests} />
        </li>
      ))}
    </ul>
  )
}

export default PageList