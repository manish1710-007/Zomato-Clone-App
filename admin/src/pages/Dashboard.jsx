import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const data = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 300 },
    { name: "Mar", sales: 500 },
    { name: "Apr", sales: 200 },
    { name: "May", sales: 600 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4">Orders: 120</Card>
        <Card className="p-4">Products: 50</Card>
        <Card className="p-4">Customers: 30</Card>
        <Card className="p-4">Revenue: $1200</Card>
      </div>
      <h3 className="text-xl font-bold mb-2">Sales Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Admin = () => {
  return (
    <Router>
      <div className="flex">
        <div className="w-64 bg-gray-200 min-h-screen p-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <nav>
            <ul>
              <li><Link to="/admin">Dashboard</Link></li>
              <li><Link to="/admin/orders">Orders</Link></li>
              <li><Link to="/admin/products">Products</Link></li>
              <li><Link to="/admin/customers">Customers</Link></li>
              <li><Link to="/admin/settings">Settings</Link></li>
            </ul>
          </nav>
        </div>
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/orders" element={<div>Orders Page</div>} />
            <Route path="/admin/products" element={<div>Products Page</div>} />
            <Route path="/admin/customers" element={<div>Customers Page</div>} />
            <Route path="/admin/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
