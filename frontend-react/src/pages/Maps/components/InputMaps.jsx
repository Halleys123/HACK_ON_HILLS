import React from 'react';

export default function InputMaps({
  placeholder = '',
  label = '',
  className,
  ...props
}) {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-neutral-700 font-mont text-sm font-semibold'>
        {label}
      </label>

      <input
        {...props}
        className={`min-w-24 max-w-44 h-12 bg-neutral-200 rounded-md px-4 text-neutral-700 font-mont text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${className}`}
        type='text'
        placeholder={placeholder}
      />
    </div>
  );
}
