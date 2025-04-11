import React from 'react';
import Header from './HotelDashboard/components/Header';

export default function HotelRooms() {
  return (
    <div className='flex flex-col gap-4'>
      <Header
        user={{ name: 'John Doe' }}
        currentDate={new Date().toLocaleDateString()}
      />
    </div>
  );
}
