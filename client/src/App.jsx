import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./pages/RegistrationForm";
import Institution from "./components/institution";
import Shopkeeper from "./components/shopkeeper";
import Donor from "./components/donor";
import Feedback from "./components/feedback";
import LoginComponent from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/institution" element={<Institution />} />
        <Route path="/shopkeeper" element={<Shopkeeper />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </>
  );
}

export default App;
