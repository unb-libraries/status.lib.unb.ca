import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteList from './SiteList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <SiteList key="default" dataSource='reports' />} />
        <Route path='/errored' element={
          <SiteList key="err" dataSource='reports.err' />} />
        <Route path='/recently-errored' element={
          <SiteList key="rec" dataSource='reports.err.rec' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
