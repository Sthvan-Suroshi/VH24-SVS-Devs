import React, { useState } from "react";
import DonorRegistrationForm from "../components/DonorRegistrationForm";
import ShopkeeperRegistrationForm from "../components/ShopkeeperRegistrationForm";
import InstitutionRegistration from "../components/InstitutionRegistration";

const Registration = () => {
  const [userType, setUserType] = useState("");

  const handleSelection = (type) => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {userType === "" ? (
        <div className="max-w-md mx-auto p-20 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Select Registration Type</h2>
          <button
            onClick={() => handleSelection("donor")}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mb-4"
          >
            Donor
          </button>
          <button
            onClick={() => handleSelection("shopkeeper")}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mb-4"
          >
            Shopkeeper
          </button>
          <button
            onClick={() => handleSelection("institution")}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Institution
          </button>
        </div>
      ) : userType === "donor" ? (
        <DonorRegistrationForm onBack={() => setUserType("")} />
      ) : userType === "shopkeeper" ? (
        <ShopkeeperRegistrationForm onBack={() => setUserType("")} />
      ) : (
        <InstitutionRegistration onBack={() => setUserType("")} />
      )}
    </div>
  );
};

export default Registration;
