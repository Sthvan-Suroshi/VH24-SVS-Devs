import React, { useState } from 'react';
import { FaHandHoldingHeart, FaSearch, FaEye, FaTrophy, FaUserFriends, FaDollarSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DonorsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestsModal, setShowRequestsModal] = useState(false);

  const donorData = [
    { id: 1, name: 'John Doe', totalDonated: 5000, lastDonation: '2023-05-01', campaigns: 3 },
    { id: 2, name: 'Jane Smith', totalDonated: 7500, lastDonation: '2023-05-03', campaigns: 5 },
    { id: 3, name: 'Bob Johnson', totalDonated: 3000, lastDonation: '2023-05-05', campaigns: 2 },
    { id: 4, name: 'Alice Brown', totalDonated: 10000, lastDonation: '2023-05-02', campaigns: 7 },
    { id: 5, name: 'Charlie Davis', totalDonated: 2500, lastDonation: '2023-05-04', campaigns: 1 },
  ];

  const filteredDonors = donorData.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDonations = donorData.reduce((sum, donor) => sum + donor.totalDonated, 0);
  const totalDonors = donorData.length;
  const averageDonation = totalDonations / totalDonors;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center text-blue-600">
          <FaHandHoldingHeart className="mr-2" /> Donors Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Donations</h2>
              <p className="text-3xl font-bold text-green-600">₹{totalDonations.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaUserFriends className="text-4xl text-blue-500 mr-4" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Donors</h2>
              <p className="text-3xl font-bold text-blue-600">{totalDonors}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaTrophy className="text-4xl text-yellow-500 mr-4" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Average Donation</h2>
              <p className="text-3xl font-bold text-yellow-600">₹{averageDonation.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Top Donors</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donorData.sort((a, b) => b.totalDonated - a.totalDonated).slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalDonated" fill="#4F46E5" name="Total Donated" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Donor List</h2>
            <button
              onClick={() => setShowRequestsModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
            >
              <FaEye className="mr-2" /> Show Requests
            </button>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search donors..."
                className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Donated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Donation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaigns Supported
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">{donor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">₹{donor.totalDonated.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donor.lastDonation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donor.campaigns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showRequestsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Current Funding Requests</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>COVID-19 Relief Fund - $25,000 needed</li>
              <li>Education for Underprivileged Children - $10,000 needed</li>
              <li>Clean Water Initiative - $15,000 needed</li>
            </ul>
            <button
              onClick={() => setShowRequestsModal(false)}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorsDashboard;