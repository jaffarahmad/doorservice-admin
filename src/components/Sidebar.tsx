import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    {
      path: '/workers',
      icon: Users,
      label: 'Workers'
    },
    {
      path: '/add-worker',
      icon: UserPlus,
      label: 'Add Worker'
    },
    {
      path: '/reports',
      icon: FileText,
      label: 'Reports'
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'Settings'
    }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">DoorService</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-link animate-slide-in ${
                    isActive
                      ? 'active'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@doorservice.com</p>
          </div>
        </div>
        
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full group"
        >
          <div className="p-1 rounded group-hover:bg-red-100">
            <LogOut size={18} />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;