import React from 'react';
import MessageContext from '@/context/MessageContext';
import { useState } from 'react';
import { ToastContainer } from '@/components/Message';

// Message Provider
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    const id = Date.now();
    const newMessage = {
      id,
      ...message,
    };

    setMessages((prev) => [newMessage, ...prev]);

    if (message.duration !== 0) {
      setTimeout(() => {
        removeMessage(id);
      }, message.duration || 5000);
    }
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
      <ToastContainer />
    </MessageContext.Provider>
  );
};

export default MessageProvider;
