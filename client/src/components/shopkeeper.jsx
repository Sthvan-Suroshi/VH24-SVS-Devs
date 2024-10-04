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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Shopkeeper Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${donation.donationType === 'food' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {donation.donationType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {donation.donationType === 'food' ? donation.items.join(', ') : `₹${donation.amount}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
  );
};

export default Shopkeeper;