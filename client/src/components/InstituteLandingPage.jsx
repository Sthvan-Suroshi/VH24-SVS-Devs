import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Request 1', amount: 100 },
  { name: 'Request 2', amount: 50 },
  { name: 'Request 3', amount: 200 },
];

const InstituteLandingPage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Institute Dashboard</h1>
      <p>This is where you can manage your institute's requests and donations.</p>
      <h2>Recent Requests:</h2>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
      <h2>Donation History:</h2>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
      <button className="btn btn-primary">View All Requests</button>
      <button className="btn btn-primary">Make a New Request</button>
    </div>
  );
};

export default InstituteLandingPage;