import React from 'react';

const BookingSummary = ({ fetchedRoomDetails }) => (
  <div className='p-6 bg-gray-50 border-b'>
    <h3 className='font-medium text-gray-800'>Booking Summary</h3>
    {fetchedRoomDetails.length > 0 ? (
      fetchedRoomDetails.map((room, index) => (
        <div key={index} className='flex justify-between mt-2'>
          <div>
            <p className='font-semibold'>{room.name || 'Deluxe King Room'}</p>
          </div>
          <div className='text-right'>
            <p className='font-bold text-lg'>${room.price || '180'}</p>
            <p className='text-xs text-gray-500'>Includes taxes & fees</p>
          </div>
        </div>
      ))
    ) : (
      <p className='text-sm text-gray-500'>Loading room details...</p>
    )}
  </div>
);

export default BookingSummary;
