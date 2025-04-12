import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ReservationsTable from './components/ReservationsTable';
import SearchAndFilters from './components/SearchAndFilters';
import Pagination from '@/components/Pagination';
import customFetch from '@/utils/Fetch';
import useLoading from '@/hooks/useLoading';
import { useMessage } from '@/hooks/useMessage';
import { useLoggedIn } from '@/hooks/useLoggedIn';
import Loading from '@/components/Loading';

export default function HotelStaffDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const message = useMessage();
  const {
    loading,
    setLoading,
    message: loadingMessage,
    setMessage,
  } = useLoading(false);
  const { isLoggedIn, setIsLoggedIn } = useLoggedIn();
  const [user, setUser] = useState(null);

  const [reservations, setReservations] = useState([]);
  const [myHotels, setMyHotels] = useState([
    {
      value: '',
      label: 'All Hotels',
    },
  ]);
  const [selectedHotel, setSelectedHotel] = useState('');

  async function getMyHotels() {
    setLoading(true);
    const response = await customFetch('/user/getMyHotels', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setLoading(false);
    if (response.error) {
      message.error('Error', response.data.message || 'Something went wrong');
    } else {
      message.success('Success', response.data.message);
      const tempHotels = [
        {
          value: '',
          label: 'All Hotels',
        },
      ];
      for (const hotel of response.data.data.hotels) {
        tempHotels.push({
          value: hotel._id,
          label: hotel.hotelName,
        });
      }
      setMyHotels(tempHotels);
      if (response.data.data.hotels.length === 0) {
        message.warn(
          'No Hotels Found',
          'You have not added any hotels yet, Please add a hotel to get started'
        );
      }
      console.log(response.data.data.hotels);
    }
  }

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
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      setIsLoggedIn(true);
      message.success(
        'Success',
        `Hello ${response.data.data.user.name}, Welcome back!`
      );
      if (response.data.data.user.role !== 'owner') {
        message.warn(
          'Not Authorized',
          'You are not authorized to access this page'
        );
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
      setUser(response.data.data.user);
    }

    console.log(user);
  }

  // todo modify this code as backend can handle multiple hotelId
  async function getReservations(page = 1, hotelId = '') {
    setLoading(true);
    const response = await customFetch(
      `/booking/reservations?hotelIds=${hotelId}&page=${page}&checkInStatus=${activeTab}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    setLoading(false);
    if (response.error) {
      message.message('Info', response.data.message || 'Something went wrong');
      setReservations([]);
    } else {
      console.log(response.data);
      message.success('Success', response.data.message);
      setReservations(response.data.data.bookings);
      setTotalPages(response.data.data.pagination.limit / 10 || 1);
    }
  }

  async function reload() {
    setLoading(true);
    await getMyHotels();
    await getReservations(currentPage, selectedHotel.value);
    setLoading(false);
  }

  useEffect(() => {
    if (!isLoggedIn) checkIsLoggedIn();
  }, [isLoggedIn]);

  useEffect(() => {
    getMyHotels();
  }, []);

  useEffect(() => {
    getReservations(currentPage, selectedHotel.value);
  }, [selectedHotel, activeTab]);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Loading visible={loading} text={loadingMessage} />
      <Header currentDate={currentDate} user={user} />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hotelsList={myHotels}
          setSelectedHotel={setSelectedHotel}
        />
        <div className='border-b border-gray-200 mb-6'>
          <nav className='-mb-px flex space-x-8'>
            <button
              onClick={() => setActiveTab('all')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Reservations
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Check-ins
            </button>
            <button
              onClick={() => setActiveTab('checked-in')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'checked-in'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Currently Checked In
            </button>
            <button
              onClick={() => setActiveTab('checked-out')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'checked-out'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recent Check-outs
            </button>
          </nav>
        </div>
        <ReservationsTable
          filteredReservations={reservations}
          reload={reload}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
