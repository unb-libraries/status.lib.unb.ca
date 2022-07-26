import Iconed, { Icons } from "../UI/Icon"
import Page from "./Page"
import classes from './PageList.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const PageList = (props) => {
  return (
    <ul>
      {props.pages.map(page => (
        <li key={page.id} className={classes['page-list-item']}>
          <Page id={page.id} title={page.title} href={`${props.siteUrl}${page.path}`} tests={page.tests} />
        </li>
      ))}
    </ul>
  )
}

export default PageList