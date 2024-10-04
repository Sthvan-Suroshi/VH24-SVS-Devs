import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Registration from './components/Registration';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />




        
      </Routes>
    </>

    
  );
}

export default App;
