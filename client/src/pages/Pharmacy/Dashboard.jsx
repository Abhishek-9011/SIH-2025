import React, { useState } from 'react';
import { DollarSign, ShoppingCart, TrendingUp, Users, Package, Pill, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample data for the revenue chart
  const revenueData = [
    { month: 'Jan', thisYear: 45000, lastYear: 38000 },
    { month: 'Feb', thisYear: 52000, lastYear: 42000 },
    { month: 'Mar', thisYear: 48000, lastYear: 45000 },
    { month: 'Apr', thisYear: 38000, lastYear: 35000 },
{ month: 'May', thisYear: 55000, lastYear: 48000 },
    { month: 'Jun', thisYear: 62000, lastYear: 52000 }
  ];

  const MetricCard = ({ icon: Icon, title, value, change, changeType, iconColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        <div className="flex items-center text-sm">
          <span className={`${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'increase' ? '↑' : '↓'} {change}
          </span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
    </div>
  );

  return ( <div className="flex flex-col md:flex-row h-screen bg-gray-50">
   
        <div>
            <Sidebar/>
        </div>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pharmacy Dashboard</h1>
          <p className="text-gray-600">Monitor your pharmacy's performance and inventory</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Package}
            title="Total Stock Items"
            value="2,847"
            change="8% vs last month"
            changeType="increase"
            iconColor="bg-blue-500"
          />
          
          <MetricCard
            icon={ShoppingCart}
            title="Total Orders"
            value="156"
            change="12% vs last month"
            changeType="increase"
            iconColor="bg-indigo-500"
          />
          
          <MetricCard
            icon={DollarSign}
            title="Total Revenue"
            value="₹2,45,890.00"
            change="15% vs last month"
            changeType="increase"
            iconColor="bg-green-500"
          />
          
          <MetricCard
            icon={Users}
            title="Total Customers"
            value="89"
            change="7% vs last month"
            changeType="increase"
            iconColor="bg-purple-500"
          />
        </div>

        {/* Revenue Overview Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value, name) => [`₹${value.toLocaleString()}`, name === 'thisYear' ? 'This Year' : 'Last Year']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="thisYear" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="lastYear" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">This Year</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Last Year</span>
            </div>
          </div>
        </div>

        {/* Additional Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-500 mr-4">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500 mr-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-teal-500 mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Daily Average</p>
                <p className="text-2xl font-bold text-gray-900">₹8,196</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;