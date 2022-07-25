import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteList from './Site/SiteList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <SiteList key="default" dataSource='reports' emptyMessage="No status reports available." />} />
        <Route path='/errored' element={
          <SiteList key="err" dataSource='reports.err' emptyMessage="No current errors." />} />
        <Route path='/recently-errored' element={
          <SiteList key="rec" dataSource='reports.err.rec' emptyMessage="No recent errors." />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
