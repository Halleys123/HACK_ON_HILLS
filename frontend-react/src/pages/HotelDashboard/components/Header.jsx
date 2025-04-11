import { School, User } from 'lucide-react';
import React from 'react';
import { FaCube, FaRestroom } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

export default function Header({ currentDate, user }) {
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-semibold text-gray-900'>
          Hotel Staff Dashboard
        </h1>
        <div className='flex items-center space-x-4'>
          <NavLink
            to={'/dashboard'}
            end
            className={({ isActive }) => {
              if (isActive) {
                return 'text-blue-500 flex items-center flex-row gap-2 hover:text-blue-700 focus:outline-none';
              }
              return 'text-gray-500 flex items-center flex-row gap-2 hover:text-gray-700 focus:outline-none';
            }}
          >
            <FaCube size={18} />
            Home
          </NavLink>
          <NavLink
            to={'/dashboard/hotels'}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-blue-500 flex items-center flex-row gap-2 hover:text-blue-700 focus:outline-none';
              }
              return 'text-gray-500 flex items-center flex-row gap-2 hover:text-gray-700 focus:outline-none';
            }}
          >
            <School size={18} />
            Hotels
          </NavLink>
          <NavLink
            to={'/dashboard/rooms'}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-blue-500 flex items-center flex-row gap-2 hover:text-blue-700 focus:outline-none';
              }
              return 'text-gray-500 flex items-center flex-row gap-2 hover:text-gray-700 focus:outline-none';
            }}
          >
            <FaRestroom size={18} />
            Rooms
          </NavLink>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='text-sm text-gray-500'>{currentDate}</div>
          <div className='flex items-center'>
            <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white'>
              <User size={18} />
            </div>
            <span className='ml-2 text-sm font-medium text-gray-700'>
              {user ? user.name : 'Guest'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
