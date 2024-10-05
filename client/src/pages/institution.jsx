import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRequestForDonation } from "../../store/slices/institutionSlice.js";

const Institution = () => {
  const [request, setRequest] = useState({
    totalAmount: "",
    foodItems: [],
  });

  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({ itemName: "", totalQuantity: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const addFoodItem = () => {
    if (newItem.itemName && newItem.totalQuantity) {
      setRequest((prev) => ({
        ...prev,
        foodItems: [
          ...prev.foodItems,
          {
            ...newItem,
            remainingQuantity: newItem.totalQuantity, // Initialize remainingQuantity
          },
        ],
      }));
      setNewItem({ itemName: "", totalQuantity: "" });
    }
  };

  const detectDonationType = () => {
    const hasAmount = request.totalAmount.trim() !== "";
    const hasFood = request.foodItems.length > 0;

    if (hasAmount && hasFood) return "both";
    if (hasAmount) return "money";
    if (hasFood) return "food";
    return "";
  };

  const submitRequest = async (e) => {
    e.preventDefault();

    const donationType = detectDonationType();

    if (donationType === "") {
      alert("Please provide either food items or a monetary amount.");
      return;
    }

    let requestData = {};

    if (donationType === "food") {
      requestData = {
        donationType: "food",
        foodItems: request.foodItems,
      };
    } else if (donationType === "money") {
      requestData = {
        donationType: "money",
        totalAmount: request.totalAmount,
        remainingAmount: request.totalAmount,
      };
    } else if (donationType === "both") {
      requestData = {
        donationType: "both",
        totalAmount: request.totalAmount,
        remainingAmount: request.totalAmount,
        foodItems: request.foodItems,
      };
    }

    console.log("Submitting request:", requestData);

    const res = await dispatch(createRequestForDonation(requestData));

    if (res.type === "createRequestForDonation/fulfilled") {
      alert("Request submitted successfully!");
    }

    if (res.type === "createRequestForDonation/rejected") {
      alert("Error submitting request. Please try again.");
    }

    setRequest({ totalAmount: "", foodItems: [] });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Institution Request
        </h1>
        <form onSubmit={submitRequest} className="space-y-6">
          <div>
            <label
              htmlFor="totalAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Total Amount Required (₹)
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={request.totalAmount}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter total amount (optional)"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Food Items</h3>
            {request.foodItems.map((item, index) => (
              <div
                key={index}
                className="mb-2 p-2 bg-gray-100 rounded-md flex justify-between items-center"
              >
                <span>{item.itemName}</span>
                <span>Total: {item.totalQuantity}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <input
              type="text"
              name="itemName"
              value={newItem.itemName}
              onChange={handleItemChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Item name"
            />
            <input
              type="number"
              name="totalQuantity"
              value={newItem.totalQuantity}
              onChange={handleItemChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Total quantity"
            />
            <button
              type="button"
              onClick={addFoodItem}
              className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Add Item
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Institution;
