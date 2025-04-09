import React from 'react';
import { MapPin } from 'lucide-react';

function HotelCard({
  image,
  title,
  location,
  price,
  currency = '$',
  period = '/night',
  onClick,
}) {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
      className='max-w-xs w-full rounded-lg overflow-hidden bg-white hover:bg-neutral-50 cursor-pointer hover:outline outline-neutral-300'
    >
      <div className='relative h-48 overflow-hidden'>
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
        />
      </div>

      {/* Card Content */}
      <div className='p-4'>
        <h3 className='text-xl font-semibold text-gray-800'>{title}</h3>

        <div className='flex items-center mt-1 text-gray-500'>
          <MapPin size={16} className='mr-1' />
          <span className='text-sm'>{location}</span>
        </div>

        <div className='mt-4'>
          <span className='text-xl font-bold'>
            {currency}
            {price}
          </span>
          <span className='text-gray-500 text-sm'>{period}</span>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
