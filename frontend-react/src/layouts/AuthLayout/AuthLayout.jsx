import React from 'react';
import { Outlet } from 'react-router-dom';

import chamba from '@assets/chamba.jpg';
import shimla from '@assets/shimla.jpg';
import manali from '@assets/manali.jpg';
import dharamshala from '@assets/dharamshala.jpg';

import ImageBoxAuthLayout from './components/ImageBoxAuthLayout';

export default function AuthLayout() {
  return (
    <div className='flex flex-row w-screen h-screen px-8 py-2 overflow-hidden gap-6'>
      <div className='flex flex-col gap-4 flex-1 w-full z-10 bg-white/60 sm:bg-white backdrop-blur-md sm:backdrop-blur-none rounded-2xl shadow-lg sm:shadow-none p-8'>
        <Outlet />
      </div>
      <div className='px-4 sm:px-0 absolute md:static left-1/2 md:left-0 w-screen sm:w-full -translate-x-1/2 md:translate-0 sm:flex shrink-0 flex-col gap-4 flex-1 items-center'>
        <div className='flex flex-col gap-4 infinite-scroll-auth-page'>
          <ImageBoxAuthLayout
            image={shimla}
            title='Chamba'
            description='A beautiful hill station in Himachal Pradesh, India.'
          />
          <ImageBoxAuthLayout
            image={manali}
            title='Manali'
            description='A popular tourist destination in Himachal Pradesh, India.'
          />
          <ImageBoxAuthLayout
            image={chamba}
            title='Chamba'
            description='A picturesque town in Himachal Pradesh, India.'
          />
          <ImageBoxAuthLayout
            image={dharamshala}
            title='Dharamshala'
            description='A serene town in Himachal Pradesh, India.'
          />
        </div>
        <div className='flex flex-col gap-4 infinite-scroll-auth-page'>
          <ImageBoxAuthLayout
            image={shimla}
            title='Chamba'
            description='A beautiful hill station in Himachal Pradesh, India.'
          />
          <ImageBoxAuthLayout
            image={manali}
            title='Manali'
            description='A popular tourist destination in Himachal Pradesh, India.'
          />
          <ImageBoxAuthLayout
            image={chamba}
            title='Chamba'
            description='A picturesque town in Himachal Pradesh, India.'
          />
          <ImageBoxAuthLayout
            image={dharamshala}
            title='Dharamshala'
            description='A serene town in Himachal Pradesh, India.'
          />
        </div>
      </div>
    </div>
  );
}
