import React, { useState } from "react";
import { FaStore, FaSearch, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const ShopkeepersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  const navigate = useNavigate();

  const shopkeeperData = [
    {
      id: 1,
      name: "Shop A",
      itemsDistributed: 500,
      lastDistribution: "2023-05-02",
      location: "Downtown",
    },
    {
      id: 2,
      name: "Shop B",
      itemsDistributed: 750,
      lastDistribution: "2023-05-04",
      location: "Suburb",
    },
    {
      id: 3,
      name: "Shop C",
      itemsDistributed: 600,
      lastDistribution: "2023-05-06",
      location: "City Center",
    },
    {
      id: 4,
      name: "Shop D",
      itemsDistributed: 400,
      lastDistribution: "2023-05-03",
      location: "Industrial Area",
    },
    {
      id: 5,
      name: "Shop E",
      itemsDistributed: 550,
      lastDistribution: "2023-05-05",
      location: "Residential Area",
    },
  ];

  const filteredShopkeepers = shopkeeperData.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <FaStore className="mr-2" /> Shopkeepers Dashboard
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Items Distributed by Shop
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shopkeeperData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="itemsDistributed"
                fill="#8884d8"
                name="Items Distributed"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Shopkeeper List</h2>
            <button
              onClick={() => navigate("/shopkeeper")}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <FaBoxOpen className="mr-2" /> Show Donation list
            </button>
          </div>
          <div className="mb-4">
          
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Distributed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Distribution
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredShopkeepers.map((shop) => (
                  <tr key={shop.id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">{shop.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shop.itemsDistributed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shop.lastDistribution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shop.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showInventoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Current Inventory</h2>
            <ul className="list-disc pl-5">
              <li>Food Packages: 1000 units</li>
              <li>Hygiene Kits: 500 units</li>
              <li>Blankets: 300 units</li>
              <li>Water Bottles: 2000 units</li>
            </ul>
            <button
              onClick={() => setShowInventoryModal(false)}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopkeepersDashboard;
