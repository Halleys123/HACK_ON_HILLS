import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import React, { useRef } from 'react';
import {
  FaStar,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaImage,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function HotelDetailsCard({ hotel }) {
  const message = useMessage();
  const ref = useRef(null);
  const navigate = useNavigate();

  if (!hotel) return null;

  async function submitImage(e) {
    e.preventDefault();
    const formData = new FormData(ref.current);
    try {
      let response = await fetch(
        `${import.meta.env.VITE_BACKEND}/hotel/${hotel._id}/add-primary-image`,
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

  return (
    <div className='w-full bg-white border-l-4 border-gray-300 shadow-sm hover:border-blue-500 transition-all duration-200 mb-3'>
      <div className='flex flex-row'>
        {/* Image Column */}
        <div className='w-24 sm:w-32 md:w-48 bg-gray-100 flex-shrink-0'>
          {hotel.primaryImage ? (
            <img
              src={`${import.meta.env.VITE_BACKEND}/images/${
                hotel.primaryImage
              }`}
              alt={hotel.hotelName}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-400'>
              <FaImage />
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className='flex-grow p-4 flex flex-col justify-between'>
          <div>
            <div className='flex justify-between items-start mb-1'>
              <h2 className='text-lg font-medium text-gray-900'>
                {hotel.hotelName}
              </h2>
              <div className='flex items-center text-sm'>
                <span className='font-bold text-gray-700 mr-1'>
                  {hotel.rating}
                </span>
                <FaStar className='text-yellow-500 text-xs' />
              </div>
            </div>

            <div className='text-xs text-gray-500 mb-2 flex items-center'>
              <FaMapMarkerAlt className='mr-1 text-gray-400' />
              <span className='truncate'>
                {[hotel.city, hotel.state, hotel.country]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className='flex justify-between items-center mt-2'>
            <div className='text-xs text-gray-400'>
              ID: {hotel._id?.substring(0, 6)}
            </div>

            <div className='flex space-x-2'>
              <form ref={ref} onSubmit={submitImage}>
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
              <button
                onClick={() => {
                  navigate('/dashboard/hotels/' + hotel._id);
                }}
                className='p-1 text-blue-600 hover:bg-blue-50 rounded'
              >
                <FaEye size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetailsCard;
