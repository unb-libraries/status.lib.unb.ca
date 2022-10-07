import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Main/Main';
import './App.module.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Main key="default" dataSource='reports' emptyMessage="No status reports available." />} />
        <Route path='/errored' element={
          <Main key="err" dataSource='reports.err' emptyMessage="No current errors." />} />
        <Route path='/recently-errored' element={
          <Main key="rec" dataSource='reports.err.rec' emptyMessage="No recent errors." />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
