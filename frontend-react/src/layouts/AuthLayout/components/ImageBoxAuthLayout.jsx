import React from 'react';

export default function ImageBoxAuthLayout({ image, title, description }) {
  return (
    <div className='flex flex-col shrink-0 gap-2 rounded-lg relative overflow-hidden max-w-2xl h-fit'>
      <img src={image} alt={title} className='w-full' />
      <div className='flex flex-col gap-0 px-4 bg-neutral-300/30 rounded-md p-2 mt-auto absolute bottom-2 left-2 right-2 bg-blur'>
        <h2 className='text-lg font-bold text-white font-mont'>{title}</h2>
        <p className='text-sm text-white font-mont'>{description}</p>
      </div>
    </div>
  );
}
