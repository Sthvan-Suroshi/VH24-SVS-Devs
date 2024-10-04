import React, { useState } from "react";

const Institution = () => {
  const [request, setRequest] = useState({
    totalAmount: "",
    foodItems: [],
  });
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
        foodItems: [...prev.foodItems, newItem],
      }));
      setNewItem({ itemName: "", totalQuantity: "" });
    }
  };

  const submitRequest = (e) => {
    e.preventDefault();
    console.log("Submitting request:", request);
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
              placeholder="Enter total amount needed"
              required
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
              required
            />
            <input
              type="number"
              name="totalQuantity"
              value={newItem.totalQuantity}
              onChange={handleItemChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Total quantity"
              required
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
