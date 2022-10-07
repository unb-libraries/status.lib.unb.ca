import React from "react"
import useConfig from "../../hooks/useConfig"
import Site from './Site'
import classes from './SiteList.module.css'

const SiteList = (props) => {
  const { expandable } = useConfig()

  return (
    <React.Fragment>
      {props.sites.length > 0 && (
        <ul className={classes['site-list']}>
          {props.sites.map(site => 
            <li key={site.id} groups={site.groups}>
              <Site id={site.id} title={site.title} url={site.url} timestamp={site.time} pages={site.pages} runs={site.runs} expandable={expandable} />
            </li>
          )}
        </ul>
      )}
      {props.sites.length === 0 && <div>{props.emptyMessage}</div>}
    </React.Fragment>
  )
  
}

export default SiteList