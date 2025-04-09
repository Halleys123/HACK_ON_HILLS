import React from 'react';

import room1 from '@assets/room1.jpg';
import room2 from '@assets/room2.jpg';
import room3 from '@assets/room3.jpg';
import RoomCard from './RoomCard';

const RoomsSection = () => {
  const rooms = [
    {
      id: 1,
      name: 'Deluxe King Room',
      image: room1,
      description: 'Spacious room with king-size bed and city view',
      amenities: ['Free WiFi', 'Breakfast included', 'Air conditioning'],
      price: 180,
      originalPrice: 220,
      capacity: '2 adults',
      size: '32 m²',
    },
    {
      id: 2,
      name: 'Premium Suite',
      image: room2,
      description: 'Luxury suite with separate living area and balcony',
      amenities: ['Free WiFi', 'Breakfast included', 'Mini bar', 'Bathtub'],
      price: 280,
      originalPrice: 350,
      capacity: '2 adults, 2 children',
      size: '48 m²',
    },
    {
      id: 3,
      name: 'Twin Comfort Room',
      image: room3,
      description: 'Comfortable room with two single beds',
      amenities: ['Free WiFi', 'Air conditioning', 'Desk'],
      price: 150,
      originalPrice: 190,
      capacity: '2 adults',
      size: '28 m²',
    },
  ];

  return (
    <div className='mt-12 mb-16'>
      <h2 className='text-3xl font-bold text-gray-800 mb-2'>Available Rooms</h2>
      <p className='text-gray-600 mb-8'>
        Select from our range of comfortable and stylish accommodations
      </p>

      <div className='space-y-6'>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
