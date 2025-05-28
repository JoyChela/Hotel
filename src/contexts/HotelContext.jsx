// contexts/HotelContext.jsx
import React, { createContext, useContext, useState } from 'react';

const HotelContext = createContext();

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

// Initial data
const initialGuests = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0101',
    checkIn: '2025-05-28',
    checkOut: '2025-05-30',
    room: '101',
    status: 'checked-in'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0102',
    checkIn: '2025-05-29',
    checkOut: '2025-05-31',
    room: '205',
    status: 'reserved'
  }
];

const initialRooms = [
  { id: 101, type: 'Standard', price: 120, status: 'occupied', floor: 1 },
  { id: 102, type: 'Standard', price: 120, status: 'available', floor: 1 },
  { id: 201, type: 'Deluxe', price: 180, status: 'maintenance', floor: 2 },
  { id: 202, type: 'Deluxe', price: 180, status: 'available', floor: 2 },
  { id: 205, type: 'Deluxe', price: 180, status: 'reserved', floor: 2 },
  { id: 301, type: 'Suite', price: 300, status: 'available', floor: 3 },
];

export const HotelProvider = ({ children }) => {
  const [guests, setGuests] = useState(initialGuests);
  const [rooms, setRooms] = useState(initialRooms);
  const [activeRoute, setActiveRoute] = useState('dashboard');

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      case 'checked-in': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCheckIn = (guestId) => {
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, status: 'checked-in' }
        : guest
    ));
    
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      setRooms(rooms.map(room => 
        room.id.toString() === guest.room 
          ? { ...room, status: 'occupied' }
          : room
      ));
    }
  };

  const handleCheckOut = (guestId) => {
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      setRooms(rooms.map(room => 
        room.id.toString() === guest.room 
          ? { ...room, status: 'available' }
          : room
      ));
      
      setGuests(guests.filter(g => g.id !== guestId));
    }
  };

  const addGuest = (guestData) => {
    const newGuest = {
      ...guestData,
      id: Math.max(...guests.map(g => g.id), 0) + 1
    };
    setGuests([...guests, newGuest]);
    
    setRooms(rooms.map(room => 
      room.id.toString() === guestData.room 
        ? { ...room, status: 'reserved' }
        : room
    ));
  };

  const updateGuest = (guestId, guestData) => {
    setGuests(guests.map(g => g.id === guestId ? {...guestData, id: guestId} : g));
  };

  const updateRoomStatus = (roomId, status) => {
    setRooms(rooms.map(r => r.id === roomId ? {...r, status} : r));
  };

  const deleteGuest = (guestId) => {
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
      setRooms(rooms.map(room => 
        room.id.toString() === guest.room 
          ? { ...room, status: 'available' }
          : room
      ));
    }
    setGuests(guests.filter(g => g.id !== guestId));
  };

  const value = {
    guests,
    rooms,
    activeRoute,
    setActiveRoute,
    getStatusColor,
    handleCheckIn,
    handleCheckOut,
    addGuest,
    updateGuest,
    updateRoomStatus,
    deleteGuest
  };

  return (
    <HotelContext.Provider value={value}>
      {children}
    </HotelContext.Provider>
  );
};