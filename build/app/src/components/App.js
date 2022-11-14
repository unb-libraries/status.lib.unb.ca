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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
