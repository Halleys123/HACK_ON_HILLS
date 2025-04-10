import React from 'react';

import logo from '@assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => {
        navigate('');
      }}
      className='flex flex-row gap-1 items-center'
    >
      <img
        src={logo}
        alt='Logo'
        className='w-16 h-16 object-contain rounded-full'
      />
      <span className='font-mont select-none text-xl font-semibold text-neutral-800'>
        Discover Himachal
      </span>
    </Link>
  );
}
