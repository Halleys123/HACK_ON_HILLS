import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, ChevronUp } from 'lucide-react';
import DatePickerHotelLanding from '../../LandingPage/components/DatePickerHotelLandning';
import landing from '@/assets/hotel.jpg';
import { useMessage } from '@/hooks/useMessage';

export default function SearchRooms() {
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const message = useMessage();

  const toggleGuestDropdown = () => {
    setIsGuestDropdownOpen(!isGuestDropdownOpen);
  };

  const incrementCount = (setter, value) => {
    setter(value + 1);
  };

  const decrementCount = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  return (
    <div
      id='section-one'
      style={{
        height: 'calc(100vh - 1rem)',
      }}
      className='flex flex-col gap-4 overflow-hidden relative'
    >
      <img
        className='w-full h-full object-cover rounded-lg'
        src={landing}
        alt='Hotel Landing'
      />
      {/* Gradient overlay */}
      <div
        className='absolute inset-0 rounded-lg'
        style={{
          background:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      ></div>

      <div className='absolute top-8 left-8 right-8 flex justify-between items-center'>
        <div className='text-white text-xl font-bold'>Hotel Logo here</div>
        {/* 
          // todo: add user name if logged in 
          */}
        <div className='flex gap-4'>
          <button className='px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition'>
            Sign In
          </button>
          <button className='px-4 py-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition'>
            Register
          </button>
        </div>
      </div>

      <div className='absolute left-8 bottom-64 max-w-2xl'>
        <h1 className='font-mont text-5xl text-white font-bold mb-4'>
          This is Hotel Name fetched from API
        </h1>
        <p className='text-white/90 text-xl mb-6'>
          Experience luxury and comfort in the heart of the city. Book your stay
          now and enjoy exclusive amenities.
        </p>
        <div className='flex gap-4'>
          <span className='px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm'>
            5-Star Rating
          </span>
          <span className='px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm'>
            City Center
          </span>
          <span className='px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm'>
            Free Wifi
          </span>
        </div>
      </div>

      <div className='hotel-landing-bg flex flex-col md:flex-row gap-4 absolute left-8 right-8 bottom-8 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20'>
        <div className='flex flex-col gap-2 flex-1'>
          <span className='font-mont text-sm text-white font-medium'>
            Check In
          </span>
          <div className='bg-white/90 rounded-lg'>
            <DatePickerHotelLanding className='!max-w-none !w-full' />
          </div>
        </div>

        <div className='flex flex-col gap-2 flex-1'>
          <span className='font-mont text-sm text-white font-medium'>
            Check Out
          </span>
          <div className='bg-white/90 rounded-lg '>
            <DatePickerHotelLanding />
          </div>
        </div>

        <div className='flex flex-col gap-2 flex-1'>
          <span className='font-mont text-sm text-white font-medium'>
            Guests
          </span>
          <div className='relative'>
            <button
              onClick={toggleGuestDropdown}
              className='flex items-center justify-between w-full px-4 py-2 bg-white/90 rounded-lg text-gray-700'
            >
              <div className='flex items-center'>
                <Users className='h-5 w-5 text-gray-500 mr-2' />
                <span>
                  {adults + children} guests, {rooms} room
                  {rooms > 1 ? 's' : ''}
                </span>
              </div>
              {isGuestDropdownOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {isGuestDropdownOpen && (
              <div
                style={{
                  transform: 'translateY(-220px)',
                }}
                className='absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 p-4'
              >
                <div className='flex justify-between items-center mb-4'>
                  <span className='font-medium'>Adults</span>
                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => decrementCount(setAdults, adults)}
                      className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
                      disabled={adults <= 1}
                    >
                      -
                    </button>
                    <span>{adults}</span>
                    <button
                      onClick={() => incrementCount(setAdults, adults)}
                      className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className='flex justify-between items-center mb-4'>
                  <span className='font-medium'>Children</span>
                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => decrementCount(setChildren, children)}
                      className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
                      disabled={children <= 0}
                    >
                      -
                    </button>
                    <span>{children}</span>
                    <button
                      onClick={() => incrementCount(setChildren, children)}
                      className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='font-medium'>Rooms</span>
                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => decrementCount(setRooms, rooms)}
                      className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
                      disabled={rooms <= 1}
                    >
                      -
                    </button>
                    <span>{rooms}</span>
                    <button
                      onClick={() => incrementCount(setRooms, rooms)}
                      className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2 justify-end'>
          <button
            onClick={() => {
              message.success(
                'Searching...',
                'Searching for available rooms in the current hotel',
                5000
              );
            }}
            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium'
          >
            Search Availability
          </button>
        </div>
      </div>
    </div>
  );
}
