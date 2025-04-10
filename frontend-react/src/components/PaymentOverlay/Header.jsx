import React from 'react';
import { X } from 'lucide-react';

const Header = ({ onClose }) => (
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
);

export default Header;
