import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';

import room1 from '@assets/room1.jpg';
import room2 from '@assets/room2.jpg';
import room3 from '@assets/room3.jpg';

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
          <div
            key={room.id}
            className='mx-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex flex-col md:flex-row'>
              {/* Room Image */}
              <div className='relative w-72'>
                <img
                  src={room.image}
                  alt={room.name}
                  className='aspect-video h-40 md:h-full object-cover'
                />
                <button className='absolute top-4 right-4 p-2 bg-white/80 rounded-full'>
                  <Heart className='h-5 w-5 text-gray-500 hover:text-red-500' />
                </button>
              </div>

              {/* Room Details */}
              <div className='p-6 md:w-full flex flex-col'>
                <div className='flex-grow'>
                  <h3 className='text-xl font-semibold mb-2'>{room.name}</h3>
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
                      <span className='font-medium'>Room size:</span>{' '}
                      {room.size}
                    </div>
                    <div>
                      <span className='font-medium'>Capacity:</span>{' '}
                      {room.capacity}
                    </div>
                  </div>
                </div>

                <div className='flex justify-between items-end mt-6'>
                  <div>
                    <div className='flex items-center gap-1'>
                      <span className='text-2xl font-bold'>₹{room.price}</span>
                      {room.originalPrice && (
                        <span className='text-gray-500 line-through'>
                          ₹{room.originalPrice}
                        </span>
                      )}
                      <span className='text-sm text-gray-500'>/night</span>
                    </div>
                    <p className='text-xs text-gray-500'>
                      Includes taxes & fees
                    </p>
                  </div>

                  <button className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
