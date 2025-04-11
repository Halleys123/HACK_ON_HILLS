import React from 'react';
import { Heart } from 'lucide-react';
import useBookRoom from '@/hooks/useBookRoom';
import { useMessage } from '@/hooks/useMessage';

export default function RoomCard({ room }) {
  const message = useMessage();
  const { rooms, addRoom, removeRoom } = useBookRoom();
  const hasThisRoom = rooms.some((r) => r === room._id);

  return (
    <div
      key={room._id}
      className={`mx-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        !room.isAvailable
          ? 'bg-gray-200 opacity-50 pointer-events-none cursor-not-allowed'
          : ''
      }`}
    >
      <div className='flex flex-col md:flex-row'>
        {/* Room Image */}
        <div className='relative w-72'>
          <img
            src={`${import.meta.env.VITE_BACKEND}/images/${room._id}.jpg`}
            alt={room.name}
            className={`aspect-video h-40 md:h-full object-cover ${
              !room.isAvailable ? 'grayscale' : ''
            }`}
          />
          <button className='absolute top-4 right-4 p-2 bg-white/80 rounded-full'>
            <Heart className='h-5 w-5 text-gray-500 hover:text-red-500' />
          </button>
        </div>

        {/* Room Details */}
        <div className='p-6 md:w-full flex flex-col'>
          <div className='flex-grow'>
            <h3 className='text-xl font-semibold mb-2'>{room.title}</h3>
            <p className='text-gray-600 mb-4'>{room.description}</p>

            <div className='flex flex-wrap gap-2 mb-4'>
              {room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className='flex gap-6 text-sm text-gray-600'>
              <div>
                <span className='font-medium'>Room size:</span> {room.size}
              </div>
              <div>
                <span className='font-medium'>Capacity:</span> {room.capacity}
              </div>
            </div>
          </div>

          <div className='flex justify-between items-end mt-6'>
            <div>
              <div className='flex items-center gap-1'>
                <span className='text-2xl font-bold'>
                  ₹{room.pricePerNight}
                </span>
                {room.pricePerNight && (
                  <span className='text-gray-500 line-through'>
                    ₹{room.pricePerNight}
                  </span>
                )}
                <span className='text-sm text-gray-500'>/night</span>
              </div>
              <p className='text-xs text-gray-500'>Includes taxes & fees</p>
            </div>
            {!hasThisRoom ? (
              <button
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
                onClick={() => {
                  message.success('Success', 'Room added to booking!');
                  addRoom(room);
                }}
              >
                Add Room
              </button>
            ) : (
              <button
                onClick={() => {
                  message.success('Success', 'Room removed from booking!');
                  removeRoom(room);
                }}
                className='px-6 py-2 bg-gray-300 text-white rounded-lg'
              >
                Remove Room
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
