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
    handleStatusChange(id, 'Accepted');
    setDonation({ type: 'both', money: '', items: {} });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-blue-600">Donor Dashboard</h1>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-2">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">{request.institution}</h2>
              <div className="text-center mb-4">
                <p className="text-gray-700 mb-2">Amount Needed: <span className="font-bold text-blue-500">₹{request.amount}</span></p>
                <p className="text-gray-700">Items Needed: <span className="font-bold text-green-500">{request.items.join(', ')}</span></p>
              </div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 text-center 
                              ${request.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 
                                request.status === 'Accepted' ? 'bg-green-200 text-green-800' : 
                                'bg-red-200 text-red-800'}`}>
                {request.status}
              </div>

              {request.status === 'Pending' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2 text-center">Donation Type</label>
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

                  {(donation.type === 'both' || donation.type === 'money') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2 text-center">Donate Money</label>
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
                          className="block w-full pl-8 pr-12 p-3 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {(donation.type === 'both' || donation.type === 'items') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2 text-center">Donate Items</label>
                      {request.items.map((item) => (
                        <div key={item} className="flex items-center mt-2">
                          <label className="mr-2 w-24 text-center">{item}:</label>
                          <input
                            type="number"
                            value={donation.items[item] || ''}
                            onChange={(e) => handleDonationChange(e, 'item', item)}
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
                      onClick={() => handleStatusChange(request.id, 'Declined')}
                      className="flex-1 p-3 bg-red-500 text-white rounded-lg"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donor;
