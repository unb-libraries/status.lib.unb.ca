import React from 'react';
import { NavLink } from 'react-router-dom';
import SiteList from './SiteList';

function App(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/img/unb-libraries-red-black.png" alt="UNB Libraries Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `${isActive ? 'active ' : ''} nav-link`} aria-current="page">All</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/errored" className={({ isActive }) => `${isActive ? 'active ' : ''} nav-link`} aria-current="page">Errored</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/recently-errored" className={({ isActive }) => `${isActive ? 'active ' : ''} nav-link`} aria-current="page">Recently Errored</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="main" className="container">
        <h1>Systems & Services</h1>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <SiteList dataSource={props.dataSource} />
      </div>
      <footer id="footer">
        <div className="container">
          <span className="text-muted">©UNB Libraries</span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
