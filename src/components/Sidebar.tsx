import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, MessageSquare, Users, Settings, FileText, Calendar, DollarSign, FileQuestion } from 'lucide-react';
import { mockMessages } from '../mockData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'attorney' | 'consumer';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userType }) => {
  const location = useLocation();
  const unreadMessagesCount = mockMessages.filter(m => m.unread).length;
  
  const attorneyMenuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, text: 'Messages', path: '/messages', badge: unreadMessagesCount },
    { icon: DollarSign, text: 'Quotes', path: '/quotes' },
    { icon: FileText, text: 'Cases', path: '/cases' },
    { icon: Calendar, text: 'Consultations', path: '/consultations' },
    { icon: Users, text: 'Clients', path: '/clients' },
    { icon: Settings, text: 'Settings', path: '/settings' },
  ];

  const consumerMenuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, text: 'Messages', path: '/messages', badge: unreadMessagesCount },
    { icon: FileText, text: 'My Cases', path: '/cases' },
    { icon: Calendar, text: 'Appointments', path: '/consultations' },
    { icon: FileQuestion, text: 'Legal Resources', path: '/resources' },
    { icon: Settings, text: 'Settings', path: '/settings' },
  ];

  const menuItems = userType === 'attorney' ? attorneyMenuItems : consumerMenuItems;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#111111] shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <Link to="/" className="text-xl font-semibold text-white hover:text-gray-300 transition-colors">
          LinkToLawyers
        </Link>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white md:hidden"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-5">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 ${
                  location.pathname === item.path ? 'bg-gray-800 text-white' : ''
                }`}
                onClick={onClose}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex-grow">{item.text}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ml-2">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;