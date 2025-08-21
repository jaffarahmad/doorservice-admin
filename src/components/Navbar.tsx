import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="navbar px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search workers, reports, or anything..."
              className="form-input pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-medium">Quick Actions:</span>
            <button className="btn-secondary text-xs py-1.5 px-3">
              Add Worker
            </button>
          </div>

          {/* Notifications */}
          <button className="relative p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
            <Bell size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{user?.email || 'admin@doorservice.com'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;