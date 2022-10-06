import React from "react"
import DateTimestamp from './DateTimestamp'
import Icon, { Icons } from '../UI/Icon'
import Inline from '../UI/Inline'
import SiteHistoryBar from './SiteHistoryBar'
import PageList from './PageList'
import classes from './SiteMeta.module.css'

const SiteMeta = (props) => {
  return (
    <React.Fragment>
      <Inline itemClassName={classes.meta}>
        <Inline><Icon icon={Icons.page}/><span>{props.pages.length} page{props.pages.length !== 1 && 's'}</span></Inline>
        <Inline><Icon icon={Icons.clock}/><DateTimestamp milliseconds={props.timestamp} elapsed={true} text={'{} ago'} altText={'Less than a minute'} /></Inline>
        <Inline>
          <Icon icon={props.stats.unresolvedErrors > 0 ? Icons.arrowDown : Icons.arrowUp} />
          {props.stats.unresolvedErrors > 0
            ? <DateTimestamp milliseconds={props.stats.failingSince} elapsed={true} text={`Failing for ${props.stats.unresolvedErrors === 0 ? 'at least ' : ''}{}`} altText={'Less than a minute'} />
            : <DateTimestamp milliseconds={props.stats.passingSince} elapsed={true} text={`No errors for ${props.stats.resolvedErrors === 0 ? 'at least ' : ''}{}`} altText={'Less than a minute'}/>
          }
        </Inline>
      </Inline>
      {!props.collapsed && (
        <div>
          <SiteHistoryBar siteId={props.id} pages={props.pages} maxItems={14}/>
          <PageList pages={props.pages} siteUrl={props.url}/>
        </div>
      )}
    </React.Fragment>
  )
}

export default SiteMeta
