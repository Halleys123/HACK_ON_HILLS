import MessageContext from '@/context/MessageContext';
import { useContext } from 'react';

// Custom Hook
export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }

  const { addMessage } = context;

  return {
    success: (title, description, duration) =>
      addMessage({ type: 'success', title, description, duration }),
    error: (title, description, duration) =>
      addMessage({ type: 'error', title, description, duration }),
    warn: (title, description, duration) =>
      addMessage({ type: 'warn', title, description, duration }),
    message: (title, description, duration) =>
      addMessage({ type: 'message', title, description, duration }),
  };
};
