import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import Logo from '@/components/Logo';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <Logo />
      <div className='flex flex-col gap-1 my-auto'>
        <span className='font-mont text-2xl font-semibold text-neutral-800'>
          Welcome Back to Himachal Tourism
        </span>
        <span className='font-sm text-md font-mont text-neutral-500'>
          Access your bookings, explore personalized recommendations, and plan
          your next adventure with ease.
        </span>
        <span className='italic text-neutral-600 text-sm font-mont border-l-4 border-indigo-500 pl-4'>
          "Forgot where you booked your cozy stay in Manali? Don't worry — we've
          got you.."
        </span>

        <div className='grid grid-cols-2 gap-4 mt-4'>
          <Input
            placeholder={'Registered Email Address'}
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

          <Button className='max-w-32'>Login</Button>
        </div>
        <span className='text-neutral-500 text-sm font-mont mt-8'>
          Don't have an account yet?{' '}
          <Link to='/signup' className='text-indigo-500'>
            Signup
          </Link>{' '}
        </span>
      </div>
      <div className='h-16'></div>
    </>
  );
}
