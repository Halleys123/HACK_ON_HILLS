import React from 'react';

export default function Button({ onClick, className, children }) {
  return (
    <button
      className={`flex flex-row items-center cursor-pointer justify-center gap-2 shrink-0 bg-indigo-500 text-white font-mont font-semibold text-sm h-8 rounded-sm w-full hover:bg-indigo-600 transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
