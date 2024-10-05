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

<<<<<<< HEAD
  const [donation, setDonation] = useState({
    type: "both",
    money: "",
    items: {},
  });

=======
>>>>>>> 5068b3a03bb19d1b09c320b47427e0cac3ce74d6
  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

<<<<<<< HEAD
  const handleDonationTypeChange = (e, id) => {
    const { value } = e.target;
    setDonation((prev) => ({ ...prev, type: value }));
  };

  const handleDonationChange = (e, type, item = null) => {
    const { value } = e.target;
    if (type === "money") {
      setDonation((prev) => ({ ...prev, money: value }));
    } else {
      setDonation((prev) => ({
        ...prev,
        items: { ...prev.items, [item]: value },
      }));
    }
  };

  const submitDonation = (id) => {
    console.log(`Donation submitted for request ${id}:`, donation);
    handleStatusChange(id, "Accepted");
    setDonation({ type: "both", money: "", items: {} });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-blue-600">
          Here are some requests you can donate to:
        </h1>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-2">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                {request.institution}
              </h2>
              <div className="text-center mb-4">
                <p className="text-gray-700 mb-2">
                  Amount Needed:{" "}
                  <span className="font-bold text-blue-500">
                    ₹{request.amount}
                  </span>
                </p>
                <p className="text-gray-700">
                  Items Needed:{" "}
                  <span className="font-bold text-green-500">
                    {request.items.join(", ")}
                  </span>
                </p>
              </div>
              <div
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 text-center ${
                  request.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : request.status === "Accepted"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {request.status}
              </div>

              {request.status === "Pending" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2 text-center">
                      Donation Type
                    </label>
                    <select
                      value={donation.type}
                      onChange={(e) => handleDonationTypeChange(e, request.id)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="both">Money and Items</option>
                      <option value="money">Money Only</option>
                      <option value="items">Items Only</option>
                    </select>
                  </div>

                  {(donation.type === "both" || donation.type === "money") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2 text-center">
                        Donate Money
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          name="money"
                          value={donation.money}
                          onChange={(e) => handleDonationChange(e, "money")}
                          placeholder="Enter amount"
                          className="block w-full pl-8 pr-12 p-3 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {(donation.type === "both" || donation.type === "items") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2 text-center">
                        Donate Items
                      </label>
                      {request.items.map((item) => (
                        <div key={item} className="flex items-center mt-2">
                          <label className="mr-2 w-24 text-center">
                            {item}:
                          </label>
                          <input
                            type="number"
                            value={donation.items[item] || ""}
                            onChange={(e) =>
                              handleDonationChange(e, "item", item)
                            }
                            placeholder="Quantity"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full p-3 sm:text-sm border-gray-300 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => submitDonation(request.id)}
                      className="flex-1 p-3 bg-green-600 text-white rounded-lg"
                    >
                      Donate
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, "Declined")}
                      className="flex-1 p-3 bg-red-500 text-white rounded-lg"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
=======
  const handleDonationSubmit = (e, id, donation) => {
    e.preventDefault();
    console.log(`Donation submitted for request ${id}:`, donation);
    handleStatusChange(id, 'Accepted');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Hey , Donate Here !</h1>
        <div className="space-y-8">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onStatusChange={handleStatusChange}
              onDonationSubmit={handleDonationSubmit}
            />
>>>>>>> 5068b3a03bb19d1b09c320b47427e0cac3ce74d6
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
    setDonation({ type, amount: '', items: {} });
  };

  const handleAmountChange = (amount) => {
    setDonation({ ...donation, amount });
  };

  const handleItemChange = (item, quantity) => {
    setDonation({
      ...donation,
      items: { ...donation.items, [item]: quantity }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{request.institution}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            request.status === 'Accepted' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {request.status}
          </span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Amount Needed: <span className="font-semibold">₹{request.amount}</span></p>
          <p className="text-gray-600">Items: <span className="font-semibold">{request.items.join(', ')}</span></p>
        </div>
        {request.status === 'Pending' && (
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              {showForm ? 'Hide Form' : 'Donate'}
            </button>
            <button
              onClick={() => onStatusChange(request.id, 'Declined')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Decline
            </button>
          </div>
        )}
        {showForm && request.status === 'Pending' && (
          <form onSubmit={(e) => onDonationSubmit(e, request.id, donation)} className="space-y-4">
            <div>
              <label htmlFor={`donation-type-${request.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Donation Type
              </label>
              <select
                id={`donation-type-${request.id}`}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handleDonationTypeChange(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select donation type</option>
                <option value="money">Money Only</option>
                <option value="items">Items Only</option>
                <option value="both">Both Money and Items</option>
              </select>
            </div>

            {donation && (donation.type === 'money' || donation.type === 'both') && (
              <div>
                <label htmlFor={`amount-${request.id}`} className="block text-sm font-medium text-gray-700 mb-1">
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

            {donation && (donation.type === 'items' || donation.type === 'both') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
                {request.items.map((item) => (
                  <div key={item} className="flex items-center space-x-2 mb-2">
                    <label htmlFor={`${item}-${request.id}`} className="text-sm text-gray-600 w-20">{item}:</label>
                    <input
                      type="number"
                      id={`${item}-${request.id}`}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Quantity"
                      value={donation.items[item] || ''}
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