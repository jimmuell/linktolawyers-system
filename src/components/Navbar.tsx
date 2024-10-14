import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface NavbarProps {
  userType: 'attorney' | 'consumer';
  onToggleSidebar: () => void;
  onResetUserType: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userType, onToggleSidebar, onResetUserType }) => {
  return (
    <nav className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={onToggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 text-xl font-semibold text-gray-800">
              LinkToLawyers
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <Bell className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer" />
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-gray-700">
                Welcome, {userType === 'attorney' ? 'Attorney' : 'User'}
              </span>
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
              />
              <button
                onClick={onResetUserType}
                className="ml-4 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;