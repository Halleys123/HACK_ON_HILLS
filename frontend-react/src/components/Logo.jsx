import React from 'react';

import logo from '@assets/logo.png';

export default function Logo() {
  return (
    <div className='flex flex-row gap-1 items-center'>
      <img
        src={logo}
        alt='Logo'
        className='w-16 h-16 object-contain rounded-full'
      />
      <span className='font-mont select-none text-xl font-semibold text-neutral-800'>
        Discover Himachal
      </span>
    </div>
  );
}
