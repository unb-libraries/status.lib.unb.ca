import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../UI/Container'
import { NavLink } from "react-router-dom"
import classes from './Header.module.css'

const Header = () => {
  const [collapsed, setCollapsed] = useState(true)

  const navbarToggle = () => {
    setCollapsed((collapsed) => !collapsed)
  }

  const links = {
    '/': 'All',
    '/errored': 'Errored',
    '/recently-errored': 'Recently Errored',
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
                  <NavLink to={`${path}${window.location.search}`} className={({ isActive }) => isActive ? classes.active : ''} aria-current="page">{label}</NavLink>
                </li>)}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header