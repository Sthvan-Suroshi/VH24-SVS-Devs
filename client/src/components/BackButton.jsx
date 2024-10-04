import React from "react";

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
  >
    Back
  </button>
);

export default BackButton;
