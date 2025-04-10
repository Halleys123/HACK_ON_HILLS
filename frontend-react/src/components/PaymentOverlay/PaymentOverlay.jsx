import React, { useState, useEffect } from 'react';
import customFetch from '@/utils/Fetch';
import { useMessage } from '@/hooks/useMessage';
import Header from './Header';
import BookingSummary from './BookingSummary';
import PaymentForm from './PaymentForm';

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
  const [fetchedRoomDetails, setFetchedRoomDetails] = useState([]);
  const message = useMessage();

  useEffect(() => {
    if (roomDetails && roomDetails.length > 0) {
      const fetchRoomDetails = async () => {
        const response = await customFetch(
          `/room?roomId=${roomDetails.join(',')}`
        );
        if (response.error) {
          message.error(
            'Error',
            response.data.message || 'Something went wrong'
          );
        } else {
          message.success('Success', response.data.message);
          setFetchedRoomDetails(response.data.data.rooms);
        }
      };
      fetchRoomDetails();
    }
  }, [roomDetails]);

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
      alert('Payment successful! Your booking is confirmed.');
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden'>
        <Header onClose={onClose} />
        <BookingSummary fetchedRoomDetails={fetchedRoomDetails} />
        <PaymentForm
          paymentStep={paymentStep}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PaymentOverlay;
