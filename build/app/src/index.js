import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './components/App';
import SiteList from './components/SiteList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='' element={<SiteList key="default" dataSource='reports'/>} />
        <Route path='errored' element={<SiteList key="err" dataSource='reports.err'/>} />
        <Route path='recently-errored' element={<SiteList key="rec" dataSource='reports.err.rec'/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
