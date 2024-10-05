import React, { useState } from "react";

const Donor = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      institution: "Orphanage A",
      amount: 1000,
      items: ["Rice", "Beans"],
      status: "Pending",
    },
    {
      id: 2,
      institution: "Elderly Home B",
      amount: 1500,
      items: ["Milk", "Bread"],
      status: "Pending",
    },
  ]);

  const [donation, setDonation] = useState({
    type: "both",
    money: "",
    items: {},
  });

  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleDonationSubmit = (e, id, donation) => {
    e.preventDefault();
    console.log(`Donation submitted for request ${id}:`, donation);
    handleStatusChange(id, "Accepted");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Hey , Donate Here !
        </h1>
        <div className="space-y-8">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onStatusChange={handleStatusChange}
              onDonationSubmit={handleDonationSubmit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const RequestCard = ({ request, onStatusChange, onDonationSubmit }) => {
  const [donation, setDonation] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDonationTypeChange = (type) => {
    setDonation({ type, amount: "", items: {} });
  };

  const handleAmountChange = (amount) => {
    setDonation({ ...donation, amount });
  };

  const handleItemChange = (item, quantity) => {
    setDonation({
      ...donation,
      items: { ...donation.items, [item]: quantity },
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {request.institution}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              request.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : request.status === "Accepted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {request.status}
          </span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Amount Needed:{" "}
            <span className="font-semibold">₹{request.amount}</span>
          </p>
          <p className="text-gray-600">
            Items:{" "}
            <span className="font-semibold">{request.items.join(", ")}</span>
          </p>
        </div>
        {request.status === "Pending" && (
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              {showForm ? "Hide Form" : "Donate"}
            </button>
            <button
              onClick={() => onStatusChange(request.id, "Declined")}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Decline
            </button>
          </div>
        )}
        {showForm && request.status === "Pending" && (
          <form
            onSubmit={(e) => onDonationSubmit(e, request.id, donation)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor={`donation-type-${request.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Donation Type
              </label>
              <select
                id={`donation-type-${request.id}`}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handleDonationTypeChange(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select donation type
                </option>
                <option value="money">Money Only</option>
                <option value="items">Items Only</option>
                <option value="both">Both Money and Items</option>
              </select>
            </div>

            {donation &&
              (donation.type === "money" || donation.type === "both") && (
                <div>
                  <label
                    htmlFor={`amount-${request.id}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id={`amount-${request.id}`}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                    value={donation.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    required
                  />
                </div>
              )}

            {donation &&
              (donation.type === "items" || donation.type === "both") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Items
                  </label>
                  {request.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <label
                        htmlFor={`${item}-${request.id}`}
                        className="text-sm text-gray-600 w-20"
                      >
                        {item}:
                      </label>
                      <input
                        type="number"
                        id={`${item}-${request.id}`}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Quantity"
                        value={donation.items[item] || ""}
                        onChange={(e) => handleItemChange(item, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

            {donation && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Confirm Donation
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Donor;
