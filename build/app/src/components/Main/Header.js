import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'
import { NavLink } from "react-router-dom"
import classes from './Header.module.css'

const Header = () => {
  const [collapsed, setCollapsed] = useState(true)

  const navbarToggle = () => {
    setCollapsed((collapsed) => !collapsed)
  }

  const params = window.location.search.substring(1).split('&').reduce((params, param) => {
    const [key, value] = param.split('=')
    params[key] = value
    return params
  }, {})

  let allParams = {...params}
  delete allParams.status
  delete allParams.failedWithin
  let erroredParams = {...params}
  erroredParams.status = 'failed'
  delete erroredParams.failedWithin
  let recentlyErroredParams = {...params}
  delete recentlyErroredParams.status
  recentlyErroredParams.failedWithin = 24 * 60 * 60 * 1000

  const toQueryString = (params) => Object.entries(params).reduce((str, [key, value]) => `${str}${!str ? '?' : '&'}${key}=${value}`, '')
  const links = {
    [`/${toQueryString(allParams)}`]: 'All',
    [`/${toQueryString(erroredParams)}`]: 'Errored',
    [`/${toQueryString(recentlyErroredParams)}`]: 'Recently Errored',
  }

  return (
    <header>
      <Container>
        <nav className={classes.navbar}>
          <Link className={classes.logo} to="/">
            <img src="/img/unb-libraries-red-black.png" alt="UNB Libraries Logo" />
          </Link>
          <button className={classes.burger} type="button" onClick={navbarToggle} aria-controls="nav-menu" aria-expanded="false" aria-label="Toggle navigation" />
          <div id="nav-menu" className={`${classes['nav-menu']}`}>
            <ul className={collapsed ? classes.collapsed : ''}>
              {Object.entries(links).map(([path, label]) => 
                <li key={path} className={classes['nav-item']}>
                  <NavLink to={path} className={({ isActive }) => isActive ? classes.active : ''} aria-current="page">{label}</NavLink>
                </li>)}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header