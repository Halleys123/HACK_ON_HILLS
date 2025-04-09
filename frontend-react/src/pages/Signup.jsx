import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import Logo from '@/components/Logo';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <>
      <Logo />
      <div className='flex flex-col gap-1 my-auto'>
        <span className='font-mont text-2xl font-semibold text-neutral-800'>
          Discover Himachal: Where Every Journey Becomes a Story
        </span>
        <span className='font-sm text-md font-mont text-neutral-500'>
          Explore the beauty of the Himalayas, book your stay, and plan
          unforgettable adventures — all in one place. Trusted by thousands of
          travelers every year.
        </span>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <Input
            placeholder={'Your Name Here'}
            type={'text'}
            className={'max-w-80'}
            name='name'
          />
          <Input
            placeholder={'Your Email Address'}
            type={'email'}
            className={'max-w-80'}
            name='email'
          />
          <Input
            placeholder={'A secure password'}
            type={'password'}
            className={'max-w-80'}
            name='password'
          />
          <Dropdown
            placeholder='Select your role'
            className='max-w-80'
            options={[
              {
                label: 'User',
                value: 'user',
              },
              // todo: add admin role in backend and frontend
              // { label: 'Admin', value: 'admin' },
              {
                label: 'Hotel Owner',
                value: 'hotel_owner',
              },
            ]}
            name='role'
          />
          <Button className='max-w-32'>Signup</Button>
        </div>
        <span className='text-neutral-500 text-sm font-mont mt-8'>
          Already have an account?{' '}
          <Link to='/login' className='text-indigo-500'>
            Login
          </Link>{' '}
        </span>
      </div>
      <div className='h-16'></div>
    </>
  );
}
