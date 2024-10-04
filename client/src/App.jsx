import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </>

    
  );
}

export default App;
