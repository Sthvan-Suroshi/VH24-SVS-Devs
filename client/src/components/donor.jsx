import React, { useState } from 'react';

const Donor = () => {
  const [requests, setRequests] = useState([
    { id: 1, institution: 'Orphanage A', amount: 1000, items: ['Rice', 'Beans'], status: 'Pending' },
    { id: 2, institution: 'Elderly Home B', amount: 1500, items: ['Milk', 'Bread'], status: 'Pending' },
  ]);

  const [donation, setDonation] = useState({ type: 'both', money: '', items: {} });

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const handleDonationTypeChange = (e, id) => {
    const { value } = e.target;
    setDonation(prev => ({ ...prev, type: value }));
  };

  const handleDonationChange = (e, type, item = null) => {
    const { value } = e.target;
    if (type === 'money') {
      setDonation(prev => ({ ...prev, money: value }));
    } else {
      setDonation(prev => ({
        ...prev,
        items: { ...prev.items, [item]: value }
      }));
    }
  };

  const submitDonation = (id) => {
    console.log(`Donation submitted for request ${id}:`, donation);
    // Here you would send the donation to your backend
    handleStatusChange(id, 'Accepted');
    setDonation({ type: 'both', money: '', items: {} });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Donor Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">{request.institution}</h2>
              <div className="mb-4">
                <p className="text-gray-600 mb-1">Amount Needed: <span className="font-semibold text-blue-600">₹{request.amount}</span></p>
                <p className="text-gray-600">Items Needed: <span className="font-semibold text-green-600">{request.items.join(', ')}</span></p>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 
                              ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                request.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                                'bg-red-100 text-red-800'}`}>
                {request.status}
              </div>
              {request.status === 'Pending' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type</label>
                    <select
                      value={donation.type}
                      onChange={(e) => handleDonationTypeChange(e, request.id)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="both">Money and Items</option>
                      <option value="money">Money Only</option>
                      <option value="items">Items Only</option>
                    </select>
                  </div>
                  {(donation.type === 'both' || donation.type === 'money') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Donate Money</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          name="money"
                          value={donation.money}
                          onChange={(e) => handleDonationChange(e, 'money')}
                          placeholder="Enter amount"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  )}
                  {(donation.type === 'both' || donation.type === 'items') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Donate Items</label>
                      {request.items.map((item) => (
                        <div key={item} className="flex items-center mt-2">
                          <label className="mr-2 w-20">{item}:</label>
                          <input
                            type="number"
                            value={donation.items[item] || ''}
                            onChange={(e) => handleDonationChange(e, 'item', item)}
                            placeholder="Quantity"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => submitDonation(request.id)}
                      className="flex-1 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
                    >
                      Donate
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, 'Declined')}
                      className="flex-1 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donor;