import React, { useState } from 'react';

const Shopkeeper = () => {
  const [donations, setDonations] = useState([
    { id: 1, donationType: 'food', items: ['Rice', 'Beans'], deliveryStatus: 'pending', deliveryDate: null },
    { id: 2, donationType: 'money', amount: 1000, deliveryStatus: 'shipped', deliveryDate: '2023-06-15' },
  ]);

  const updateDeliveryStatus = (id, newStatus) => {
    setDonations(donations.map(donation =>
      donation.id === id ? { ...donation, deliveryStatus: newStatus, deliveryDate: new Date().toISOString().split('T')[0] } : donation
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-blue-600">Shopkeeper Request</h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Delivery Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      donation.donationType === 'food' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {donation.donationType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donation.donationType === 'food' ? donation.items.join(', ') : `₹${donation.amount}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      donation.deliveryStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      donation.deliveryStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {donation.deliveryStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.deliveryDate || 'Not set'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={donation.deliveryStatus}
                      onChange={(e) => updateDeliveryStatus(donation.id, e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shopkeeper;
