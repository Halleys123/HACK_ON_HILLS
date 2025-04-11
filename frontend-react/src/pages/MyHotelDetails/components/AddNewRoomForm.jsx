import Loading from '@/components/Loading';
import useLoading from '@/hooks/useLoading';
import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import React, { useState } from 'react';

const AddNewRoomForm = ({ onCancel, hotelId }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    title: '',
    description: '',
    type: 'suite',
    pricePerNight: '',
    maxAdults: 1,
    maxChildren: 0,
    hotelId: hotelId || '',
  });

  const {
    loading,
    setLoading,
    message: loaderMessage,
    setMessage,
  } = useLoading();
  const message = useMessage();

  async function addRoom() {
    setLoading(true);
    setMessage('Adding Room...');
    const response = await customFetch('/room/add-room', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    if (response.error) {
      message.error('Error', response.data.message || 'Something went wrong');
    } else {
      message.success('Success', response.data.message);
      onCancel();
    }
  }

  const [errors, setErrors] = useState({});

  const roomTypes = [
    { value: 'suite', label: 'Suite' },
    {
      value: 'single',
      label: 'Single',
    },
    {
      value: 'double',
      label: 'Double',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'pricePerNight' ||
        name === 'maxAdults' ||
        name === 'maxChildren'
          ? Number(value)
          : value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    addRoom();
    // onCancel();
  }

  return (
    <div className='bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full mx-auto'>
      {/* Header */}
      <Loading visible={loading} text={loaderMessage} />
      <div className='bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4'>
        <h2 className='text-xl font-bold text-white flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          Add New Room
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Room Number */}
          <div className='col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Room Number <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='roomNumber'
              value={formData.roomNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.roomNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='e.g. 101A'
            />
            {errors.roomNumber && (
              <p className='mt-1 text-sm text-red-500'>{errors.roomNumber}</p>
            )}
          </div>

          {/* Title */}
          <div className='col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Room Title <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='e.g. Deluxe King Room'
            />
            {errors.title && (
              <p className='mt-1 text-sm text-red-500'>{errors.title}</p>
            )}
          </div>

          {/* Room Type */}
          <div className='col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Room Type <span className='text-red-500'>*</span>
            </label>
            <select
              name='type'
              value={formData.type}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              {roomTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Per Night */}
          <div className='col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Price Per Night ($) <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                name='pricePerNight'
                value={formData.pricePerNight}
                onChange={handleChange}
                className={`w-full pl-7 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.pricePerNight ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='0.00'
                min='0'
                step='0.01'
              />
            </div>
            {errors.pricePerNight && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.pricePerNight}
              </p>
            )}
          </div>

          {/* Max Adults */}
          <div className='col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Max Adults
            </label>
            <div className='flex'>
              <button
                type='button'
                onClick={() =>
                  setFormData({
                    ...formData,
                    maxAdults: Math.max(1, formData.maxAdults - 1),
                  })
                }
                className='px-3 py-2 border border-gray-300 bg-gray-100 rounded-l-md hover:bg-gray-200'
              >
                -
              </button>
              <input
                type='number'
                name='maxAdults'
                value={formData.maxAdults}
                onChange={handleChange}
                className='w-full text-center border-t border-b border-gray-300 py-2'
                min='1'
                max='10'
              />
              <button
                type='button'
                onClick={() =>
                  setFormData({
                    ...formData,
                    maxAdults: Math.min(10, formData.maxAdults + 1),
                  })
                }
                className='px-3 py-2 border border-gray-300 bg-gray-100 rounded-r-md hover:bg-gray-200'
              >
                +
              </button>
            </div>
          </div>

          {/* Max Children */}
          <div className='col-span-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Max Children
            </label>
            <div className='flex'>
              <button
                type='button'
                onClick={() =>
                  setFormData({
                    ...formData,
                    maxChildren: Math.max(0, formData.maxChildren - 1),
                  })
                }
                className='px-3 py-2 border border-gray-300 bg-gray-100 rounded-l-md hover:bg-gray-200'
              >
                -
              </button>
              <input
                type='number'
                name='maxChildren'
                value={formData.maxChildren}
                onChange={handleChange}
                className='w-full text-center border-t border-b border-gray-300 py-2'
                min='0'
                max='6'
              />
              <button
                type='button'
                onClick={() =>
                  setFormData({
                    ...formData,
                    maxChildren: Math.min(6, formData.maxChildren + 1),
                  })
                }
                className='px-3 py-2 border border-gray-300 bg-gray-100 rounded-r-md hover:bg-gray-200'
              >
                +
              </button>
            </div>
          </div>

          {/* Hotel ID - Hidden if passed as prop */}
          {!hotelId && (
            <div className='col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Hotel ID <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='hotelId'
                value={formData.hotelId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.hotelId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter hotel ID'
              />
              {errors.hotelId && (
                <p className='mt-1 text-sm text-red-500'>{errors.hotelId}</p>
              )}
            </div>
          )}

          {/* Description */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description <span className='text-red-500'>*</span>
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows='4'
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='Describe the room features and amenities'
            ></textarea>
            {errors.description && (
              <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className='mt-8 flex justify-end space-x-3'>
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewRoomForm;
