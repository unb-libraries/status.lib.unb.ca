import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'

const Header = () => {
  const [collapsed, setCollapsed] = useState(true)

  const navbarToggle = () => {
    setCollapsed((collapsed) => !collapsed)
  }
  
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/img/unb-libraries-red-black.png" alt="UNB Libraries Logo" />
          </Link>
          <button className={`navbar-toggler${collapsed ? ' collapsed' : ''}`} type="button" onClick={navbarToggle} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent" className={`collapse navbar-collapse${!collapsed ? ' show' : ''}`}>
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header