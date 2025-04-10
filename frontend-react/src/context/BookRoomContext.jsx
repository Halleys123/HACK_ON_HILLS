import { createContext } from 'react';

const BookRoomContext = createContext({
  adults: 0,
  children: 0,
  rooms: [],
  checkInDate: null,
  checkOutDate: null,
  totalPrice: 0,
});

export default BookRoomContext;
