import React, { useEffect, useState } from 'react';

import RoomCard from './RoomCard';
import PaymentOverlay from '@/components/PaymentOverlay/PaymentOverlay';
import useBookRoom from '@/hooks/useBookRoom';
import useLoading from '@/hooks/useLoading';
import customFetch from '@/utils/Fetch';
import Loading from '@/components/Loading';
import { useMessage } from '@/hooks/useMessage';
import Dropdown from '@/components/Dropdown';

const RoomsSection = ({ hotelId }) => {
  const { rooms: bookedRooms } = useBookRoom();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [RoomDetails, setRoomDetails] = useState([]);

  const {
    loading,
    setLoading,
    setMessage,
    message: loaderMessage,
  } = useLoading();
  const message = useMessage();

  async function getRoomDetails(hotelId, isAvailable = '') {
    setLoading(true);
    setMessage('Fetching Hotel Details...');
    const response = await customFetch(
      `/room?isAvailable=${isAvailable}&hotelId=${hotelId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    setLoading(false);
    if (response.error) {
      message.error('Error', response.data.message || 'Something went wrong');
    } else {
      message.success('Success', response.data.message);
      setRoomDetails(response.data.data.rooms);
    }
    console.log(response);
  }
  useEffect(() => {
    getRoomDetails(hotelId);
  }, []);

  return (
    <div className='mt-12 mb-16 flex flex-col'>
      <Loading visible={loading} text={loaderMessage} />
      <div className='flex flex-row justify-between'>
        <div>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            Available Rooms
          </h2>
          <p className='text-gray-600 mb-8'>
            Select from our range of comfortable and stylish accommodations
          </p>
        </div>
        <Dropdown
          options={[
            { label: 'All', value: '' },
            { label: 'Available', value: true },
            { label: 'Not Available', value: false },
          ]}
          onSelect={(value) => {
            getRoomDetails(hotelId, value.value);
          }}
          className='max-w-48 w-48'
        />
      </div>

      <div className='space-y-6'>
        {RoomDetails.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
      <button
        onClick={() => {
          setIsPaymentOpen(true);
        }}
        className='mr-8 mt-8 self-end px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
      >
        Complete Booking
      </button>
      <PaymentOverlay
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        roomDetails={bookedRooms}
      />
    </div>
  );
};

export default RoomsSection;
