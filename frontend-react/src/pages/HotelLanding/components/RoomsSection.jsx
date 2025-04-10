import React, { useState } from 'react';

import RoomCard from './RoomCard';
import PaymentOverlay from '@/components/PaymentOverlay';

const RoomsSection = ({ rooms }) => {
  // const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  // const [selectedRoom, setSelectedRoom] = useState(null);

  console.log(rooms);

  return (
    <div className='mt-12 mb-16 flex flex-col'>
      <h2 className='text-3xl font-bold text-gray-800 mb-2'>Available Rooms</h2>
      <p className='text-gray-600 mb-8'>
        Select from our range of comfortable and stylish accommodations
      </p>

      <div className='space-y-6'>
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
      <button className='mr-8 self-end px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
        Complete Booking
      </button>
    </div>
  );
};

export default RoomsSection;
