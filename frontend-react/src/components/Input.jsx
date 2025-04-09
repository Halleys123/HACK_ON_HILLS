import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({ type, placeholder, className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div
      className={`flex flex-row items-center outline-2 outline-neutral-200 h-8 shrink-0 rounded-sm w-full focus-within:outline-neutral-500 transition-colors duration-200 ${className}`}
    >
      <input
        {...props}
        type={inputType}
        placeholder={placeholder}
        className='w-full h-full px-3 text-sm outline-none'
      />
      {type === 'password' && (
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='p-2 focus:outline-none'
        >
          {showPassword ? (
            <EyeOff
              size={18}
              className='text-neutral-600 hover:text-neutral-700 cursor-pointer'
            />
          ) : (
            <Eye
              size={18}
              className='text-neutral-600 hover:text-neutral-700 cursor-pointer'
            />
          )}
        </button>
      )}
    </div>
  );
}
