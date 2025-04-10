import Logo from '@/components/Logo';
import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../Button';
import UserDropdown from './UserDropdown';
import Loading from '../Loading';
import useLoading from '@/hooks/useLoading';
import { useLoggedIn } from '@/hooks/useLoggedIn';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Hotels', path: '/hotels' },
  { name: 'About', path: '/About' },
];

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useLoggedIn();
  const [user, setUser] = useState(null);

  const {
    setLoading,
    setMessage,
    loading,
    message: loadingMessage,
  } = useLoading();
  const message = useMessage();

  useEffect(() => {
    async function checkIsLoggedIn() {
      const token = localStorage.getItem('token');
      setLoading(true);
      setMessage('Checking if you are logged in...');
      const response = await customFetch('/user/isLoggedIn', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (response.error) {
        setIsLoggedIn(false);
        message.message(
          'Not Authorized',
          'You are not logged in, Please login to get full experience'
        );
      } else {
        setIsLoggedIn(true);
        message.success(
          'Success',
          `Hello ${response.data.data.user.name}, Welcome back!`
        );
        setUser(response.data.data.user);
      }
    }

    if (localStorage.getItem('token') && !isLoggedIn) {
      checkIsLoggedIn();
    }
  }, []);

  return (
    <div className='flex flex-row justify-between items-center bg-white shadow-md px-4 py-2 w-full fixed top-0 left-0 z-30'>
      <Loading visible={loading} text={loadingMessage} />
      <Logo />
      <div className='flex flex-row gap-3'>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => {
              return isActive
                ? 'text-blue-500 font-semibold'
                : 'text-gray-700 hover:text-blue-500 transition duration-200';
            }}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      {loading ? (
        <div className='h-14 w-54 rounded-md ghost'></div>
      ) : !isLoggedIn ? (
        <div className='flex flex-row gap-3 items-center'>
          <Link
            to='/login'
            className='text-gray-700 hover:text-blue-500 transition duration-200'
          >
            Login
          </Link>
          <Link
            to='/signup'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <UserDropdown
          user={user}
          message={message}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}
