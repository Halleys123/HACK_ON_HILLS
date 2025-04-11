import BookRoomContext from '@/context/BookRoomContext';
import React, { useState } from 'react';

export default function BookRoomProvider({ children }) {
  const [adults, setAdults] = useState(0);
  const [childrenCount, setChildren] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);

  function addRoom(room) {
    setRooms((prevRooms) => [...prevRooms, room._id]);
    setTotalPrice((prevPrice) => prevPrice + room.pricePerNight);
  }
  function removeRoom(room) {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== room._id));
    setTotalPrice((prevPrice) => prevPrice - room.pricePerNight);
  }
  function clearRooms() {
    setRooms([]);
    setTotalPrice(0);
  }
  function setAdultsCount(count) {
    setAdults(count);
  }
  function setChildrenCount(count) {
    setChildren(count);
  }

  function setCheckIn(date) {
    setCheckInDate(date);
  }
  function setCheckOut(date) {
    setCheckOutDate(date);
  }

  return (
    <BookRoomContext.Provider
      value={{
        setAdultsCount,
        setChildrenCount,
        setCheckIn,
        setCheckOut,
        addRoom,
        removeRoom,
        clearRooms,
        adults,
        childrenCount,
        checkInDate,
        checkOutDate,
        rooms,
        totalPrice,
        hotel,
        setHotel,
      }}
    >
      {children}
    </BookRoomContext.Provider>
  );
}
