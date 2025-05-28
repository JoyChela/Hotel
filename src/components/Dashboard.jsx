// components/Dashboard.jsx
import React from 'react';
import { Home, Bed, LogIn, DollarSign } from 'lucide-react';
import { useHotel } from '../contexts/HotelContext';
import StatsCard from './StatsCard';
import RecentCheckIns from './RecentCheckIns';
import RoomStatusOverview from './RoomStatusOverview';

const Dashboard = () => {
  const { guests, rooms } = useHotel();

  const stats = {
    totalRooms: rooms.length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    todayRevenue: guests.filter(g => g.status === 'checked-in')
      .reduce((sum, guest) => {
        const room = rooms.find(r => r.id.toString() === guest.room);
        return sum + (room ? room.price : 0);
      }, 0)
  };

  const roomStatusCounts = rooms.reduce((acc, room) => {
    acc[room.status] = (acc[room.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Rooms" value={stats.totalRooms} icon={Home} />
        <StatsCard title="Occupied" value={stats.occupiedRooms} icon={Bed} color="red" />
        <StatsCard title="Available" value={stats.availableRooms} icon={LogIn} color="green" />
        <StatsCard title="Today's Revenue" value={`$${stats.todayRevenue}`} icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCheckIns />
        <RoomStatusOverview roomStatusCounts={roomStatusCounts} />
      </div>
    </div>
  );
};

export default Dashboard;