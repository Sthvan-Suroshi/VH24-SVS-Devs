import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./pages/RegistrationForm";
import Institution from "./components/institution";
import Shopkeeper from "./components/shopkeeper";
import Donor from "./components/donor";
import Feedback from "./components/feedback";
import LoginComponent from "./components/Login";
import Institution from "./pages/institution";
import Shopkeeper from "./pages/shopkeeper";
import Donor from "./pages/donor";
import Feedback from "./pages/feedback";
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
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/institution" element={<Institution />} />
        <Route path="/shopkeeper" element={<Shopkeeper />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/institutiondashboard" element={<InstitutionDashboard />} />
        <Route path="/donordashboard" element={<DonorsDashboard />} />
        <Route path="/shopsdashboard" element={<ShopkeepersDashboard />} />
      </Routes>
    </>
  );
}
export default App;
