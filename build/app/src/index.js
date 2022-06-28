import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App dataSource='reports'/>} />
      <Route path='/errored' element={<App dataSource='reports.err'/>} />
      <Route path='/recently-errored' element={<App dataSource='reports.err.rec'/>} />
    </Routes>
  </BrowserRouter>
);
