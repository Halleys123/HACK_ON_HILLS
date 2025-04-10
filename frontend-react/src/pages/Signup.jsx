import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import Logo from '@/components/Logo';
import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const message = useMessage();
  const navigate = useNavigate();

  const ref = useRef(null);
  async function register(e) {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const response = await customFetch('/user/register', {
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

      navigate('/hotels');
    }
  }
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
        <form
          onSubmit={register}
          ref={ref}
          className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'
        >
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
                value: 'customer',
              },
              // todo: add admin role in backend and frontend
              // { label: 'Admin', value: 'admin' },
              {
                label: 'Hotel Owner',
                value: 'owner',
              },
            ]}
            name='role'
          />
          <Button type='submit' className='max-w-32'>
            Signup
          </Button>
        </form>
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
