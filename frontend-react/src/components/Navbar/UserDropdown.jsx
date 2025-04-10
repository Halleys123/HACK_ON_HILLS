import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import {
  FiSettings,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiHome,
} from 'react-icons/fi'; // Using React Icons

const UserDropdown = ({ user, setIsLoggedIn, message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    message.success('Success', 'Logged out successfully!');
    setIsOpen(false);
  };

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 py-2 px-3 rounded-full bg-white hover:bg-gray-50 border border-gray-200 transition duration-200 shadow-sm'
      >
        <div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium'>
          {avatarLetter}
        </div>
        <span className='text-neutral-700 font-medium hidden sm:block'>
          {user?.name || 'User'}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute z-50 right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden'>
          {/* User Info Header */}
          <div className='px-4 py-3 border-b border-gray-100'>
            <p className='text-sm font-medium text-neutral-800'>{user?.name}</p>
            <p className='text-xs text-gray-500 truncate'>{user?._id}</p>
          </div>

          {/* Dropdown Options */}
          <div className='py-1'>
            <Link
              to='/profile'
              className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
              onClick={() => setIsOpen(false)}
            >
              <FiUser size={16} />
              <span>Your Profile</span>
            </Link>

            <Link
              to='/settings'
              className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
              onClick={() => setIsOpen(false)}
            >
              <FiSettings size={16} />
              <span>Settings</span>
            </Link>

            {/* Conditional Hotel Option */}
            {user?.role === 'owner' && (
              <Link
                to='/dashboard'
                className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                onClick={() => setIsOpen(false)}
              >
                <FiHome size={16} />
                <span>Go to Hotel Page</span>
              </Link>
            )}

            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left'
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
