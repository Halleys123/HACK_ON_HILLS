import React, { useState } from 'react';
import { X, CreditCard, Calendar, Lock } from 'lucide-react';

const PaymentOverlay = ({ isOpen, onClose, roomDetails }) => {
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    phone: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentStep === 1) {
      setPaymentStep(2);
    } else {
      // Process payment
      alert('Payment successful! Your booking is confirmed.');
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden'>
        {/* Header */}
        <div className='relative bg-blue-600 p-6 text-white'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30'
          >
            <X size={20} />
          </button>
          <h2 className='text-xl font-bold'>Complete Your Booking</h2>
          <p className='opacity-90'>Secure payment for your stay</p>
        </div>

        {/* Booking Summary */}
        <div className='p-6 bg-gray-50 border-b'>
          <h3 className='font-medium text-gray-800'>Booking Summary</h3>
          <div className='flex justify-between mt-2'>
            <div>
              <p className='font-semibold'>
                {roomDetails?.name || 'Deluxe King Room'}
              </p>
              <p className='text-sm text-gray-500'>
                1 night, {roomDetails?.capacity || '2 adults'}
              </p>
            </div>
            <div className='text-right'>
              <p className='font-bold text-lg'>
                ${roomDetails?.price || '180'}
              </p>
              <p className='text-xs text-gray-500'>Includes taxes & fees</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className='p-6'>
          {paymentStep === 1 ? (
            <>
              <h3 className='font-medium text-gray-800 mb-4'>
                Contact Information
              </h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='your@email.com'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='+1 (123) 456-7890'
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex items-center mb-4'>
                <CreditCard className='text-blue-600 mr-2' size={20} />
                <h3 className='font-medium text-gray-800'>Payment Details</h3>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Cardholder Name
                  </label>
                  <input
                    type='text'
                    name='cardName'
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='John Smith'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Card Number
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      name='cardNumber'
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10'
                      placeholder='1234 5678 9012 3456'
                      maxLength='19'
                      required
                    />
                    <div className='absolute right-3 top-2.5'>
                      <img
                        src='/visa-mastercard-icons.png'
                        alt='Card types'
                        className='h-5'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex space-x-4'>
                  <div className='w-1/2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Expiry Date
                    </label>
                    <div className='relative'>
                      <input
                        type='text'
                        name='expiry'
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10'
                        placeholder='MM/YY'
                        maxLength='5'
                        required
                      />
                      <Calendar
                        className='absolute left-3 top-2.5 text-gray-400'
                        size={18}
                      />
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      CVV
                    </label>
                    <div className='relative'>
                      <input
                        type='text'
                        name='cvv'
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10'
                        placeholder='123'
                        maxLength='3'
                        required
                      />
                      <Lock
                        className='absolute left-3 top-2.5 text-gray-400'
                        size={18}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className='flex items-center mt-6 text-xs text-gray-600'>
            <Lock size={14} className='mr-1' />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <div className='mt-6'>
            <button
              type='submit'
              className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium'
            >
              {paymentStep === 1 ? 'Continue to Payment' : 'Complete Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentOverlay;
