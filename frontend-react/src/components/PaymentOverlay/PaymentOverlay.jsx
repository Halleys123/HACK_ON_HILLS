import React, { useState, useEffect } from 'react';
import customFetch from '@/utils/Fetch';
import { useMessage } from '@/hooks/useMessage';
import Header from './Header';
import BookingSummary from './BookingSummary';
import PaymentForm from './PaymentForm';
import useBookRoom from '@/hooks/useBookRoom';
import useLoading from '@/hooks/useLoading';
import Loading from '../Loading';

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
  const {
    adults,
    childrenCount,
    checkInDate,
    checkOutDate,
    rooms,
    totalPrice,
    hotel,
  } = useBookRoom();
  const {
    loading,
    setLoading,
    message: loaderMessage,
    setMessage,
  } = useLoading();

  const [bookingId, setBookingId] = useState(null);
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

  async function bookRoom() {
    // hotelIds,
    // roomIds,
    // adults,
    // children,
    // specialRequests = '',
    // phone = '',
    // email = '',
    // checkOut,
    // checkIn,

    setLoading(true);
    setMessage('Booking Room...');
    const reponse = await customFetch('/booking/book-room', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hotelIds: [hotel],
        roomIds: rooms,
        adults,
        children: childrenCount,
        specialRequests: formData.specialRequests || '',
        phone: formData.phone,
        email: formData.email,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      }),
    });
    setLoading(false);
    if (reponse.error) {
      message.error('Error', reponse.data.message || 'Something went wrong');
      return false;
    } else {
      alert('Success!! You have 15 minutes to complete your payment');
      console.log('Booking Response', reponse.data.data);
      setBookingId(reponse.data.data.saveBooking._id);
      message.success('Success', reponse.data.message);
      return true;
    }
  }
  async function completePayment() {
    // bookingId, amount
    setLoading(true);
    const response = await customFetch('/pay', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId,
        amount: totalPrice,
      }),
    });
    setLoading(false);
    if (response.error) {
      message.error('Error', response.data.message || 'Something went wrong');
    } else {
      message.success('Success', response.data.message);
      setPaymentStep(3);
    }
    // onclose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (paymentStep === 1) {
      const value = await bookRoom();
      if (value) setPaymentStep(2);
      else {
        message.error('Error', 'Something went wrong while booking the room');
        onClose();
      }
    } else {
      await completePayment();
      onClose();
    }
  }

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <Loading visible={loading} text={loaderMessage} />
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
