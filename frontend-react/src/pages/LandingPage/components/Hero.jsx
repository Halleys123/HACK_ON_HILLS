import React from 'react';
import shimla from '@assets/shimla.jpg';
import ExploreButton from './ExploreButton';

export default function Hero() {
  return (
    <div className='flex flex-col gap-4 relative'>
      <div className='flex flex-col gap-4 mt-16 h-screen'>
        <img
          src={shimla}
          alt='Shimla'
          style={{
            transform: 'scaleX(-1)',
          }}
          className='w-full h-5/6 object-cover rounded-lg shadow-lg'
        />
        <div className='absolute top-16 left-0 h-5/6 w-full from-neutral-950/30 via-transparent to-transparent z-10'></div>
      </div>{' '}
      <div className='absolute top-1/2 left-12 transform -translate-y-1/2 text-white z-20'>
        <div className='flex flex-col gap-2 w-fit px-12 py-4 rounded-2xl outline outline-neutral-400 backdrop-blur-md'>
          <h1 className='text-5xl font-bold text-white'>
            Welcome to Himachal Preadesh
          </h1>
          <p className='text-xl mt-2'>
            The land of gods, temples, and mountains
          </p>
        </div>
        <ExploreButton className='ml-8 mt-14' />
      </div>
    </div>
  );
}
