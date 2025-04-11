import React from 'react';
import customFetch from '@/utils/Fetch';
import Header from '../HotelDashboard/components/Header';
import { useMessage } from '@/hooks/useMessage';
import { useEffect, useState } from 'react';
import useLoading from '@/hooks/useLoading';
import HotelDetailsCard from './components/HotelDetailsCard';
import Loading from '@/components/Loading';
import Overlay from '@/components/Overlay';
import AddHotel from './components/AddHotelForm';

export default function MyHotels() {
  const {
    loading,
    setLoading,
    message: LoaderMessage,
    setMessage,
  } = useLoading();
  const message = useMessage();

  const [user, setUser] = useState('');
  const [hotels, setHotels] = useState([]);
  const [addHotel, setAddHotel] = useState(false);

  async function getUser() {
    setLoading(true);
    setMessage('Fetching User...');
    const response = await customFetch('/user/isLoggedIn');
    setLoading(false);
    if (response.error) {
      message.error('Error', response.data.message || 'Something went wrong');
    } else {
      setUser(response.data.data.user);
      message.success('Success', response.data.message);
    }
  }

  async function getMyHotels() {
    setLoading(true);
    setMessage('Fetching Hotels...');
    const select = 'hotelName id rating primaryImage city country state';
    const response = await customFetch(`/user/getMyHotels?select=${select}`, {
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
      setHotels(response.data.data.hotels);
    }

    console.log(response.data.data.hotels);
  }

  useEffect(() => {
    getUser();
    getMyHotels();
  }, []);

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Header currentDate={new Date().toLocaleDateString()} user={user} />

      <Loading visible={loading} text={LoaderMessage} />
      <Overlay visible={addHotel}>
        <AddHotel
          onSubmit={() => {
            setAddHotel(false);
            getMyHotels();
          }}
          onClose={() => setAddHotel(false)}
        />
      </Overlay>
      <div className='flex flex-row-reverse w-full'>
        <button
          onClick={() => setAddHotel(true)}
          className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          Add New Hotel
        </button>
      </div>
      <div className='flex flex-col gap-6 w-full p-4'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>

        {hotels.length === 0 ? (
          <div className='text-center py-10'>
            <p className='text-gray-500'>You don't have any hotels yet.</p>
            <button className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
              Add Your First Hotel
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-6 w-full'>
            {hotels.map((hotel) => (
              <HotelDetailsCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
