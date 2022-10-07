import Icon, { Icons } from '../UI/Icon'
import Inline from '../Main/Inline'
import classes from './Page.module.css'

const Page = (props) => {
  const urlClickHandler = (event) => {
    event.stopPropagation()
  }

  const tests = props.tests.map(test => (
    <li key={test.id} className={classes[test.status === 'passed' ? 'test-passed' : 'test-failed']}>
      <Inline><Icon icon={test.status === 'passed' ? Icons.checkYes : Icons.checkNo}/><span>{test.title}</span></Inline>
    </li>
  ))

  return (
    <div className={classes.page}>
      <h3 className={classes.title}>{props.title}</h3>
      {props.href && <a className={classes.url} href={props.href} target="_blank" onClick={urlClickHandler}>{props.href}</a>}
      <ul>{tests}</ul>
    </div>
  )
}

export default Page