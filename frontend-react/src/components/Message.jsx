import React, { useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import MessageContext from '@/context/MessageContext';

// Message Context

// Message Types and their properties
const messageTypes = {
  success: {
    icon: <CheckCircle />,
    bgColor: 'bg-green-100 border-green-500',
    textColor: 'text-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: <AlertCircle />,
    bgColor: 'bg-red-100 border-red-500',
    textColor: 'text-red-800',
    iconColor: 'text-red-500',
  },
  warn: {
    icon: <AlertTriangle />,
    bgColor: 'bg-yellow-100 border-yellow-500',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-500',
  },
  message: {
    icon: <Info />,
    bgColor: 'bg-blue-100 border-blue-500',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-500',
  },
};

// Individual Toast Component
const Toast = ({ id, type, title, description, onClose }) => {
  const { icon, bgColor, textColor, iconColor } = messageTypes[type];

  return (
    <div
      className={`animate-message-box flex items-start p-4 mb-3 rounded-lg shadow-md border-l-4 ${bgColor} animate-slide-in`}
      style={{ width: '320px' }}
    >
      <div className={`mr-3 ${iconColor}`}>{icon}</div>
      <div className='flex-1'>
        <h3 className={`font-semibold ${textColor}`}>{title}</h3>
        <p className={`text-sm ${textColor}`}>{description}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className='ml-2 text-gray-500 hover:text-gray-700'
      >
        <X size={18} />
      </button>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = () => {
  const { messages, removeMessage } = useContext(MessageContext);

  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col-reverse'>
      {messages.map((message) => (
        <Toast key={message.id} {...message} onClose={removeMessage} />
      ))}
    </div>
  );
};
