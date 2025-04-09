import React from 'react';
import RoomsSection from './components/RoomsSection';
import SearchRooms from './components/SearchRooms';

export default function HotelLanding() {
  return (
    <div className='flex flex-col p-2 gap-6'>
      <SearchRooms />
      <RoomsSection />
    </div>
  );
}
