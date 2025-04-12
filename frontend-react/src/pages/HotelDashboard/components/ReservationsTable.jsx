import Loading from '@/components/Loading';
import useLoading from '@/hooks/useLoading';
import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import { LogIn, LogOut, MoreVertical, User } from 'lucide-react';
import React from 'react';

export default function ReservationsTable({
  filteredReservations,
  reload = () => {},
}) {
  const {
    loading,
    setLoading,
    setMessage,
    message: loadingMessage,
  } = useLoading();
  const message = useMessage();

  async function handleCheckIn(bookingId) {
    setLoading(true);
    setMessage('Checking In...');
    const response = await customFetch(`/booking/check-in/${bookingId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    setLoading(false);
    if (response.error) {
      message.error('Error', response.data.message || 'Something went wrong');
    } else {
      message.success('Success', response.data.message);
      reload();
    }
  }

  async function handleCheckOut(bookingId) {
    setLoading(true);
    setMessage('Checking Out...');
    const response = await customFetch(`/booking/check-out/${bookingId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    setLoading(false);
    if (response.error) {
      message.error('Error', response.data.message || 'Something went wrong');
    } else {
      message.success('Success', response.data.message);
      reload();
    }
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
      <Loading text={loadingMessage} visible={loading} />
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
          {loading ? (
            <tr className='ghost w-full h-10'></tr>
          ) : (
            filteredReservations.map((reservation) => (
              <tr key={reservation?._id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
                      <User size={20} className='text-gray-500' />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {reservation?.userId.name}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {reservation?.guests.adults} adults(s) and{' '}
                        {reservation?.guests.children}{' '}
                        {reservation?.guests.children > 1
                          ? 'children'
                          : 'child'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    Room{' '}
                    {reservation?.roomIds
                      .map((room) => room.roomNumber)
                      .join(', ')}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {new Date(reservation?.checkIn).toLocaleDateString()}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {new Date(reservation?.checkOut).toLocaleDateString()}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      reservation?.checkInStatus === 'upcoming'
                        ? 'bg-yellow-100 text-yellow-800'
                        : reservation?.checkInStatus === 'checked-in'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {reservation?.checkInStatus === 'upcoming'
                      ? 'Upcoming'
                      : reservation?.checkInStatus === 'checked-in'
                      ? 'Checked In'
                      : 'Checked Out'}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <div className='flex justify-end space-x-2'>
                    {reservation?.checkInStatus === 'upcoming' && (
                      <button
                        onClick={() => handleCheckIn(reservation?._id)}
                        className='inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                      >
                        <LogIn size={14} className='mr-1' /> Check In
                      </button>
                    )}
                    {reservation?.checkInStatus === 'checked-in' && (
                      <button
                        onClick={() => handleCheckOut(reservation?._id)}
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
            ))
          )}
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
  );
}
