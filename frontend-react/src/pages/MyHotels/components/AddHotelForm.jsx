import Loading from '@/components/Loading';
import useLoading from '@/hooks/useLoading';
import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import { X } from 'lucide-react';
import React, { useState } from 'react';

const AddHotel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    hotelName: '',
    description: '',
    address: '',
    state: '',
    city: '',
    country: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});
  const message = useMessage();
  const {
    loading,
    setLoading,
    setMessage,
    message: loaderMessage,
  } = useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('Adding Hotel...');
    const response = await customFetch('/hotel', {
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
      onClose();
    }
  }

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
      <div className='flex flex-row justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold mb-6 text-left text-gray-800'>
          Add New Hotel
        </h2>
        <X size={18} className='cursor-pointer' onClick={onClose} />
      </div>
      <Loading visible={loading} text={loaderMessage} />
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='hotelName'
            className='block text-sm font-medium text-gray-700'
          >
            Hotel Name
          </label>
          <input
            type='text'
            id='hotelName'
            name='hotelName'
            value={formData.hotelName}
            onChange={handleChange}
            className={`mt-1 block w-full px-2 py-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors.hotelName ? 'border-red-500' : ''
            }`}
          />
          {errors.hotelName && (
            <p className='mt-1 text-sm text-red-500'>{errors.hotelName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows='3'
            className={`mt-1 block px-2 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors.description ? 'border-red-500' : ''
            }`}
          ></textarea>
          {errors.description && (
            <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700'
          >
            Address
          </label>
          <input
            type='text'
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className={`mt-1 block px-2 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors.address ? 'border-red-500' : ''
            }`}
          />
          {errors.address && (
            <p className='mt-1 text-sm text-red-500'>{errors.address}</p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='state'
              className='block text-sm font-medium text-gray-700'
            >
              State
            </label>
            <input
              type='text'
              id='state'
              name='state'
              value={formData.state}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                errors.state ? 'border-red-500' : ''
              }`}
            />
            {errors.state && (
              <p className='mt-1 text-sm text-red-500'>{errors.state}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='city'
              className='block text-sm font-medium text-gray-700'
            >
              City
            </label>
            <input
              type='text'
              id='city'
              name='city'
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                errors.city ? 'border-red-500' : ''
              }`}
            />
            {errors.city && (
              <p className='mt-1 text-sm text-red-500'>{errors.city}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='country'
              className='block text-sm font-medium text-gray-700'
            >
              Country
            </label>
            <input
              type='text'
              id='country'
              name='country'
              value={formData.country}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                errors.country ? 'border-red-500' : ''
              }`}
            />
            {errors.country && (
              <p className='mt-1 text-sm text-red-500'>{errors.country}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='zipCode'
              className='block text-sm font-medium text-gray-700'
            >
              Zip Code
            </label>
            <input
              type='text'
              id='zipCode'
              name='zipCode'
              value={formData.zipCode}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                errors.zipCode ? 'border-red-500' : ''
              }`}
            />
            {errors.zipCode && (
              <p className='mt-1 text-sm text-red-500'>{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
