import { NavLink } from "react-router-dom"

const Menu = () => {
  const links = {
    '/': 'All',
    '/errored': 'Errored',
    '/recently-errored': 'Recently Errored',
  }

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {Object.entries(links).map(([path, label]) => 
        <li key={path} className="nav-item">
          <NavLink to={path} className={({ isActive }) => `${isActive ? 'active ' : ''} nav-link`} aria-current="page">{label}</NavLink>
        </li>)}
    </ul>
  )
}

export default Menu