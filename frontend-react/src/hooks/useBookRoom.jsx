import BookRoomContext from '@/context/BookRoomContext';
import { useContext } from 'react';

export default function useBookRoom() {
  const context = useContext(BookRoomContext);

  if (!context) {
    throw new Error('useBookRoom must be used within a BookRoomProvider');
  }

  return context;
}
