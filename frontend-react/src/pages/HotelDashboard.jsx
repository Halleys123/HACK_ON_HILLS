import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  LogIn,
  LogOut,
  User,
  Bell,
  Filter,
  MoreVertical,
} from 'lucide-react';
import customFetch from '@/utils/Fetch';
import useLoading from '@/hooks/useLoading';
import { useMessage } from '@/hooks/useMessage';

export default function HotelStaffDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const message = useMessage();
  const {
    loading,
    setLoading,
    message: loadingMessage,
    setMessage,
  } = useLoading(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Mock data for reservations
  const [reservations, setReservations] = useState([
    {
      id: 1,
      guestName: 'John Smith',
      roomNumber: '301',
      checkInDate: '2025-04-10',
      checkOutDate: '2025-04-15',
      status: 'upcoming',
      paymentStatus: 'paid',
      guests: 2,
      specialRequests: 'High floor, away from elevator',
    },
    {
      id: 2,
      guestName: 'Emma Johnson',
      roomNumber: '204',
      checkInDate: '2025-04-09',
      checkOutDate: '2025-04-12',
      status: 'checked-in',
      paymentStatus: 'paid',
      guests: 1,
      specialRequests: 'Extra pillows',
    },
    {
      id: 3,
      guestName: 'Michael Chen',
      roomNumber: '512',
      checkInDate: '2025-04-08',
      checkOutDate: '2025-04-10',
      status: 'checked-in',
      paymentStatus: 'paid',
      guests: 3,
      specialRequests: '',
    },
    {
      id: 4,
      guestName: 'Sarah Williams',
      roomNumber: '105',
      checkInDate: '2025-04-05',
      checkOutDate: '2025-04-10',
      status: 'checked-in',
      paymentStatus: 'paid',
      guests: 2,
      specialRequests: 'Quiet room',
    },
  ]);

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
      message.messaage(
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

    console.log(user);
  }

  useEffect(() => {
    // Set current date in a readable format
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
  useEffect(() => {
    if (!isLoggedIn) checkIsLoggedIn();
  }, [isLoggedIn]);
  const handleCheckIn = (id) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'checked-in' }
          : reservation
      )
    );
  };

  const handleCheckOut = (id) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'checked-out' }
          : reservation
      )
    );
  };

  const filteredReservations = reservations.filter((reservation) => {
    // Filter by active tab
    if (activeTab !== 'all' && reservation.status !== activeTab) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        reservation.guestName.toLowerCase().includes(query) ||
        reservation.roomNumber.includes(query)
      );
    }

    return true;
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-semibold text-gray-900'>
            Hotel Staff Dashboard
          </h1>
          <div className='flex items-center space-x-4'>
            <div className='text-sm text-gray-500'>{currentDate}</div>
            {/*<button className='p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200'>
              <Bell size={20} />
            </button>
            */}
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

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Search and filters */}
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4'>
          <div className='relative flex-1 max-w-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search size={18} className='text-gray-400' />
            </div>
            <input
              type='text'
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Search by guest name or room number'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='flex space-x-2'>
            <button className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              <Filter size={16} className='mr-2' />
              Filters
            </button>
            <button className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              <Calendar size={16} className='mr-2' />
              Today
            </button>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Reservations Table */}
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Guest
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Room
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Check-in Date
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Check-out Date
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Status
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
                        <User size={20} className='text-gray-500' />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {reservation.guestName}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {reservation.guests} guest(s)
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      Room {reservation.roomNumber}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {new Date(reservation.checkInDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {new Date(reservation.checkOutDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reservation.status === 'upcoming'
                          ? 'bg-yellow-100 text-yellow-800'
                          : reservation.status === 'checked-in'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {reservation.status === 'upcoming'
                        ? 'Upcoming'
                        : reservation.status === 'checked-in'
                        ? 'Checked In'
                        : 'Checked Out'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='flex justify-end space-x-2'>
                      {reservation.status === 'upcoming' && (
                        <button
                          onClick={() => handleCheckIn(reservation.id)}
                          className='inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                        >
                          <LogIn size={14} className='mr-1' /> Check In
                        </button>
                      )}
                      {reservation.status === 'checked-in' && (
                        <button
                          onClick={() => handleCheckOut(reservation.id)}
                          className='inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                          <LogOut size={14} className='mr-1' /> Check Out
                        </button>
                      )}
                      <button className='text-gray-400 hover:text-gray-500'>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReservations.length === 0 && (
                <tr>
                  <td
                    colSpan='6'
                    className='px-6 py-10 text-center text-sm text-gray-500'
                  >
                    No reservations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
