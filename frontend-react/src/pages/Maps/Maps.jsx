import React from 'react';
import FiltersSections from './components/FiltersSections';
import landing from '@/assets/landing.jpg';
import HotelCard from './components/HotelCard';
import { useNavigate } from 'react-router-dom';

export default function Maps() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row gap-6 p-12 h-screen w-screen overflow-hidden'>
      <FiltersSections />
      <div
        id='map-area'
        className='pb-4 px-1 flex flex-col gap-3 flex-3/4 pt-2 ml-6 overflow-scroll'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row justify-between items-center'>
            <span className='font-mont text-lg font-semibold text-neutral-800'>
              16 Results Found
            </span>
            <span className='text-transparent text-sm font-mont'>
              Sort by: Price (Low to High)
            </span>
          </div>
          <div
            id='map'
            className='w-full aspect-video bg-neutral-100 overflow-hidden'
          ></div>
        </div>
        <div className='flex flex-row gap-4 '>
          <HotelCard
            onClick={() => navigate('/hotels/1')}
            image={landing}
            title='Woldsend Cottages'
            location='Wakefield Council, England'
            price='84'
          />
          <HotelCard
            onClick={() => navigate('/hotels/1')}
            image={landing}
            title='Woldsend Cottages'
            location='Wakefield Council, England'
            price='84'
          />
          <HotelCard
            onClick={() => navigate('/hotels/1')}
            image={landing}
            title='Woldsend Cottages'
            location='Wakefield Council, England'
            price='84'
          />
        </div>
      </div>
    </div>
  );
}
