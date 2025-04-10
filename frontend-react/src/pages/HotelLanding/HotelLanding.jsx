import React, { useEffect, useState } from 'react';
import RoomsSection from './components/RoomsSection';
import SearchRooms from './components/SearchRooms';
import customFetch from '@/utils/Fetch';
import { useMessage } from '@/hooks/useMessage';
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/Loading';

export default function HotelLanding() {
  const path = window.location.pathname;

  const message = useMessage();
  const {
    loading,
    setLoading,
    message: loaderMessage,
    setMessage,
  } = useLoading();

  const hotelId = path.split('/')[2];
  const [hotelDetails, setHotelDetails] = useState({});
  const [RoomDetails, setRoomDetails] = useState([]);

  async function getHotelDetails(hotelId) {
    setLoading(true);
    setMessage('Fetching Hotel Details...');
    const response = await customFetch('/hotel/' + hotelId, {
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
      setHotelDetails(response.data.data.hotel);
    }
    console.log('Hotel Details', response);
  }

  async function getRoomDetails(hotelId) {
    setLoading(true);
    setMessage('Fetching Hotel Details...');
    const response = await customFetch('/room?hotelId=' + hotelId, {
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
      setRoomDetails(response.data.data.rooms);
    }
    console.log(response);
  }

  useEffect(() => {
    if (hotelId) {
      getRoomDetails(hotelId);
      getHotelDetails(hotelId);
    }
  }, []);

  return (
    <div className='flex flex-col p-2 gap-6'>
      <Loading visible={loading} text={loaderMessage} />
      <SearchRooms {...hotelDetails} id={hotelDetails._id} />
      <RoomsSection rooms={RoomDetails} />
    </div>
  );
}
