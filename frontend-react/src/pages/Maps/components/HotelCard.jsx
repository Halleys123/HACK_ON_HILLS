import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';

function HotelCard({
  image,
  title,
  location,
  price,
  originalPrice,
  rating,
  reviews,
  currency = '$',
  period = '/night',
  onClick,
  viewMode = 'grid',
}) {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`${
        viewMode === 'grid'
          ? 'max-w-xs w-full rounded-lg h-fit bg-white shadow-sm hover:shadow-md transition-shadow'
          : 'w-full rounded-lg h-fit bg-white shadow-sm hover:shadow-md transition-shadow flex'
      } cursor-pointer`}
    >
      <div
        className={`relative ${
          viewMode === 'grid' ? 'h-48' : 'h-40 w-64'
        } overflow-hidden`}
      >
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
        />
        <button className='absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white'>
          <Heart size={18} className='text-gray-500 hover:text-red-500' />
        </button>
      </div>

      {/* Card Content */}
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div
          className={`${
            viewMode === 'list' ? 'flex justify-between items-start' : ''
          }`}
        >
          <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>

            <div className='flex items-center mt-1 text-gray-500'>
              <MapPin size={16} className='mr-1' />
              <span className='text-sm'>{location}</span>
            </div>

            <div className='flex items-center mt-2'>
              <Star size={16} className='text-yellow-400 mr-1' />
              <span className='text-sm font-medium'>{rating}</span>
              <span className='text-sm text-gray-500 ml-1'>
                ({reviews} Reviews)
              </span>
            </div>
          </div>

          <div className={`${viewMode === 'list' ? 'text-right' : 'mt-4'}`}>
            <div className='flex items-center gap-2'>
              <span className='text-xl font-bold'>
                {currency}
                {price}
              </span>
              {originalPrice && (
                <span className='text-gray-500 text-sm line-through'>
                  {currency}
                  {originalPrice}
                </span>
              )}
            </div>
            <div className='text-gray-500 text-xs'>Includes taxes & fees</div>
            <span className='text-gray-500 text-sm'>{period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
