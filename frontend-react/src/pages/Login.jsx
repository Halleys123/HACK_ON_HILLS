import Button from '@/components/Button';
import Input from '@/components/Input';
import Logo from '@/components/Logo';
import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const message = useMessage();
  const navigate = useNavigate();
  // Parse query parameters
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect');

  const ref = useRef(null);

  async function login(e) {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const response = await customFetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.error) {
      message.error('Error Occured', response.data.message);
    } else {
      message.success('Success', response.data.message);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user_id', response.data.data.user.id);

      console.log(redirect);
      if (redirect) {
        navigate(redirect, { replace: true });
        return null; // Return null to avoid rendering anything
      }
      navigate('/hotels');
    }
  }
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

        <form
          ref={ref}
          onSubmit={login}
          className='grid grid-cols-2 gap-4 mt-4'
        >
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

          <Button type='submit' className='max-w-32'>
            Login
          </Button>
        </form>
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
