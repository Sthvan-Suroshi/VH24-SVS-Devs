import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Registration from "./pages/RegistrationForm";
import LoginComponent from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </>
  );
}

export default App;
