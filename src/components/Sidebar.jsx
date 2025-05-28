// components/Sidebar.jsx
import React from 'react';
import { Calendar, Users, Home, Settings, Bed } from 'lucide-react';
import { useHotel } from '../contexts/HotelContext';

const Sidebar = () => {
  const { activeRoute, setActiveRoute } = useHotel();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'rooms', label: 'Rooms', icon: Bed },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
      <div className="p-6">
        <div className="space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoute(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeRoute === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;