import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaEdit,
  FaChevronLeft,
} from 'react-icons/fa';
import Header from '../HotelDashboard/components/Header';
import Loading from '@/components/Loading';
import customFetch from '@/utils/Fetch';
import useLoading from '@/hooks/useLoading';
import { useMessage } from '@/hooks/useMessage';
import Overlay from '@/components/Overlay';
import AddNewRoomForm from './components/AddNewRoomForm';
import { FaImage } from 'react-icons/fa6';

// Mock data - replace with actual API call
async function fetchHotelDetails(id, message) {
  const response = await customFetch(`/hotel/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.error) {
    message.error('Error', response.data.message || 'Something went wrong');
  } else {
    message.success('Success', response.data.message);
    return response.data.data.hotel;
  }
  // return Promise.resolve({
  //   _id: id,
  //   hotelName: 'Grand Plaza Hotel',
  //   rating: 4.7,
  //   address: '123 Main Street',
  //   city: 'New York',
  //   state: 'NY',
  //   country: 'USA',
  //   zipCode: '10001',
  //   description:
  //     'A luxurious hotel in the heart of Manhattan, offering spectacular views and world-class amenities. Perfect for both business and leisure travelers seeking comfort and convenience.',
  //   // phone: '+1 (555) 123-4567',
  //   // email: 'info@grandplaza.com',
  //   // website: 'www.grandplaza.com',
  //   primaryImage:
  //     'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  //   amenities: [
  //     'Free WiFi',
  //     'Swimming Pool',
  //     'Fitness Center',
  //     'Restaurant',
  //     'Room Service',
  //     'Conference Rooms',
  //     'Parking',
  //   ],
  //   createdAt: '2023-08-15T12:00:00Z',
  // });
}

// Mock data for rooms - replace with actual API call
async function fetchHotelRooms(hotelId, setLoading, message) {
  setLoading(true);
  const response = await customFetch(`/room?hotelId=${hotelId}`, {
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
    return response.data.data.rooms;
  }
  // return Promise.resolve([
  // {
  //   _id: 'room1',
  //   title: 'Deluxe King Room',
  //   description: 'Spacious room with a king-sized bed and city view',
  //   price: 199,
  //   capacity: 2,
  //   amenities: ['King Bed', 'City View', 'Mini Bar', 'Free WiFi'],
  //   images: [
  //     'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  //   ],
  // },
  // {
  //   _id: 'room2',
  //   title: 'Executive Suite',
  //   description:
  //     'Luxury suite with separate living area and premium amenities',
  //   price: 349,
  //   capacity: 3,
  //   amenities: ['King Bed', 'Sofa Bed', 'Balcony', 'Mini Bar', 'Free WiFi'],
  //   images: [
  //     'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  //   ],
  // },
  // ]);
}

export default function MyHotelDetails() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [addNewRoom, setAddNewRoom] = useState(false);
  const ref = useRef(null);

  const { loading, setLoading } = useLoading();
  const message = useMessage();

  async function submitImage(roomId) {
    const formData = new FormData(ref.current);
    try {
      let response = await fetch(
        `http://localhost:3000/api/v1/room/upload-image?roomId=${roomId}&hotelId=${hotelId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        }
      );
      response = await response.json();
      if (response.success) {
        message.success('Success', response.message);
      } else {
        message.error('Error', response.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
    }
  }

  useEffect(() => {
    const getHotelData = async () => {
      try {
        setLoading(true);
        const hotelData = await fetchHotelDetails(hotelId, message);
        const roomsData = await fetchHotelRooms(hotelId, setLoading, message);
        setHotel(hotelData);
        setRooms(roomsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getHotelData();
  }, [hotelId]);

  if (loading)
    return (
      <>
        <Header />
        <div className='container mx-auto px-4 py-8'>
          <Loading visible={loading} text='Loading Hotel and Rooms...' />
          <div className='animate-pulse flex flex-col space-y-4'>
            <div className='h-64 bg-gray-200 rounded-lg w-full'></div>
            <div className='h-8 bg-gray-200 rounded w-3/4'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>
            <div className='h-32 bg-gray-200 rounded w-full'></div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-6'>
        {/* Back Button */}
        <Link
          to='/dashboard/hotels'
          className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-6'
        >
          <FaChevronLeft className='mr-1' /> Back to Hotels
        </Link>
        <Overlay visible={addNewRoom}>
          <AddNewRoomForm
            hotelId={hotelId}
            onCancel={() => {
              setAddNewRoom(false);
            }}
          />
        </Overlay>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Hotel Info */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
              {/* Primary Image */}
              <div className='relative h-80 bg-gray-200'>
                {hotel?.primaryImage ? (
                  <img
                    src={
                      'http://localhost:3000/api/v1/images/' +
                      hotel?.primaryImage
                    }
                    alt={hotel?.hotelName}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full text-gray-400'>
                    No image available
                  </div>
                )}
                <div className='absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow flex items-center'>
                  <FaStar className='text-yellow-500 mr-1' />
                  <span className='font-bold'>{hotel?.rating}/5</span>
                </div>
              </div>

              {/* Hotel Details */}
              <div className='p-6'>
                <div className='flex justify-between items-start mb-4'>
                  <h1 className='text-3xl font-bold text-gray-800'>
                    {hotel?.hotelName}
                  </h1>
                  <button className='flex items-center text-blue-600 hover:text-blue-800'>
                    <FaEdit className='mr-1' /> Edit
                  </button>
                </div>

                <div className='flex items-center text-gray-600 mb-2'>
                  <FaMapMarkerAlt className='mr-2 text-gray-500' />
                  <p>
                    {[
                      hotel?.address,
                      hotel?.city,
                      hotel?.state,
                      hotel?.country,
                      hotel?.zipCode,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>

                {hotel?.phone && (
                  <div className='flex items-center text-gray-600 mb-2'>
                    <FaPhone className='mr-2 text-gray-500' />
                    <p>{hotel?.phone}</p>
                  </div>
                )}

                {hotel?.website && (
                  <div className='flex items-center text-gray-600 mb-4'>
                    <FaGlobe className='mr-2 text-gray-500' />
                    <p>{hotel?.website}</p>
                  </div>
                )}

                <div className='border-t border-b border-gray-200 py-4 my-4'>
                  <h2 className='text-xl font-semibold mb-2'>Description</h2>
                  <p className='text-gray-700 whitespace-pre-line'>
                    {hotel?.description}
                  </p>
                </div>

                {hotel?.amenities && hotel?.amenities.length > 0 && (
                  <div className='my-4'>
                    <h2 className='text-xl font-semibold mb-2'>Amenities</h2>
                    <div className='flex flex-wrap gap-2'>
                      {hotel?.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className='mt-4 text-sm text-gray-500'>
                  <p>Hotel ID: {hotel?._id}</p>
                  <p>
                    Listed since:{' '}
                    {new Date(hotel?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
              <h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
              <div className='space-y-3'>
                <button className='w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
                  Edit Hotel Details
                </button>
                <button
                  onClick={() => setAddNewRoom(true)}
                  className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
                >
                  Add New Room
                </button>
                <button className='w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors'>
                  Manage Images
                </button>
                <button className='w-full py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors'>
                  View Bookings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div className='mt-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Rooms & Suites</h2>
            <button
              onClick={() => setAddNewRoom(true)}
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
            >
              Add New Room
            </button>
          </div>

          {rooms.length === 0 ? (
            <div className='bg-gray-50 border border-gray-200 rounded-lg p-8 text-center'>
              <p className='text-gray-600 mb-4'>
                No rooms have been added to this hotel yet.
              </p>
              <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
                Add Your First Room
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
                >
                  <div className='h-48 bg-gray-200'>
                    {room.images ? (
                      <img
                        src={
                          'http://localhost:3000/api/v1/images/' +
                          room.images[0]
                        }
                        alt={room.title}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='flex items-center justify-center h-full text-gray-400'>
                        No image available
                      </div>
                    )}
                  </div>

                  <div className='p-4'>
                    <div className='flex justify-between items-start mb-2'>
                      <h3 className='text-lg font-semibold'>{room.title}</h3>
                      <p className='font-bold text-green-600'>
                        ${room.price}
                        <span className='text-sm text-gray-500'>/night</span>
                      </p>
                    </div>

                    <p className='text-gray-600 text-sm mb-3'>
                      {room.description}
                    </p>

                    <div className='flex flex-wrap gap-1 mb-3'>
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className='bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs'
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs'>
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className='flex justify-between'>
                      <form
                        ref={ref}
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitImage(room._id);
                        }}
                      >
                        <input
                          type='file'
                          name='image'
                          accept='image/*'
                          className='p-1 max-w-20 text-xs text-purple-600 hover:bg-purple-50 rounded'
                        />
                        <button
                          type='submit'
                          className='p-1 text-purple-600 hover:bg-purple-50 rounded'
                        >
                          <FaImage size={14} />
                        </button>
                      </form>
                      <button className='px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm'>
                        Edit
                      </button>
                      <button className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm'>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
