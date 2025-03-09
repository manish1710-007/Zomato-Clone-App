import React, { useState } from 'react';
import './index.css';

function App() {
  // Active page state
  const [activePage, setActivePage] = useState('Dashboard');
  // Mock notification state
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order received', read: false },
    { id: 2, text: 'Restaurant "Pizza Palace" updated menu', read: false },
    { id: 3, text: 'Monthly report is ready', read: true }
  ]);
  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Time period filter
  const [timePeriod, setTimePeriod] = useState('Today');

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mock chart data
  const orderData = [
    { time: '8am', orders: 3 },
    { time: '10am', orders: 7 },
    { time: '12pm', orders: 14 },
    { time: '2pm', orders: 8 },
    { time: '4pm', orders: 10 },
    { time: '6pm', orders: 15 }
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-lg fixed md:static z-20 h-full transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* User profile */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-gray-500">Admin</div>
            </div>
          </div>
        </div>
        
        <nav className="mt-4">
          <ul>
            {['Dashboard', 'Manage Restaurants', 'Manage Dishes', 'Orders', 'Reports', 'Settings'].map((page) => (
              <li 
                key={page}
                className={`p-2 hover:bg-gray-200 ${activePage === page ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
                onClick={() => setActivePage(page)}
              >
                <a href="#" className="text-gray-700 block">
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button className="w-full py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold">{activePage}</h2>
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">{activePage}</h2>
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Notification bell */}
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Time period filter */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <select 
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Item
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Total Restaurants</h3>
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-green-500">+2 from last {timePeriod.toLowerCase()}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Total Dishes</h3>
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-2xl font-bold">78</p>
            <p className="text-sm text-green-500">+5 from last {timePeriod.toLowerCase()}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Orders Today</h3>
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-500">Total value: $345.80</p>
          </div>
        </div>

        {/* Order chart */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4">Order Trends</h3>
          <div className="h-64 flex items-end">
            {orderData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full mx-1 bg-blue-500 rounded-t"
                  style={{ height: `${data.orders * 4}px` }}
                ></div>
                <div className="text-xs mt-2">{data.time}</div>
                <div className="text-xs font-medium">{data.orders}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity and top restaurants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent activity */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="divide-y">
              {notifications.map(notification => (
                <div key={notification.id} className="py-3 flex items-start">
                  <div className={`w-2 h-2 mt-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-500'} mr-3`}></div>
                  <div className="flex-1">
                    <p className={`${notification.read ? 'text-gray-500' : 'text-gray-800'}`}>
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 text-blue-500 text-sm font-medium">
              View All Activity
            </button>
          </div>
          
          {/* Top restaurants */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Top Restaurants</h3>
            <div className="space-y-4">
              {[
                { name: 'Pizza Palace', orders: 32, revenue: '$1,243.20' },
                { name: 'Burger Barn', orders: 28, revenue: '$984.50' },
                { name: 'Sushi Supreme', orders: 24, revenue: '$1,120.75' }
              ].map((restaurant, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-3">
                    {restaurant.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{restaurant.name}</h4>
                    <p className="text-sm text-gray-500">{restaurant.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{restaurant.revenue}</p>
                    <p className="text-xs text-green-500">+{Math.floor(Math.random() * 10) + 1}%</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 text-blue-500 text-sm font-medium">
              View All Restaurants
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;