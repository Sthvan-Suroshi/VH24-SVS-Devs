import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./pages/RegistrationForm";
import Shopkeeper from "./components/shopkeeper";
import Feedback from "./components/feedback";
import LoginComponent from "./components/Login";
import Institution from "./pages/institution";
import Donor from "./pages/donor";
import InstitutionDashboard from "./pages/institutiondashboard";
import DonorsDashboard from "./pages/donordashboard";
import ShopkeepersDashboard from "./pages/shopdashboard";

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
        <Route path="/login" element={<LoginComponent />} />+
        <Route
          path="/institution-dashboard"
          element={<InstitutionDashboard />}
        />
        <Route path="/donor-dashboard" element={<DonorsDashboard />} />
        <Route
          path="/shopkeeper-dashboard"
          element={<ShopkeepersDashboard />}
        />
      </Routes>
    </>
  );
}
export default App;
