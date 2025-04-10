import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function Overlay({ close = () => {}, visible = false, reelId = 'a', title }) {
  if (!visible) return null;

  return createPortal(
    <div
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
      }}
      onClick={close}
      className='bg-neutral-700/20 flex items-center justify-center fixed top-0 left-0 w-screen backdrop-blur-sm h-screen z-50 transition-all duration-300'
    >
      <div
        style={{
          height: `calc(384px * 16 / 9)`,
        }}
        className={`bg-white rounded-3xl md:w-96 w-64 shadow-lg overflow-hidden reel ${
          visible ? 'reel-animation' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {reelId ? (
          <div className='w-full h-full'>
            <iframe
              src={`https://www.instagram.com/reel/DHcpPFWvhz6/embed/`}
              className='w-full h-full'
              frameBorder='0'
              scrolling='no'
              allowFullScreen
              title={title}
            ></iframe>
          </div>
        ) : (
          <div className='flex items-center justify-center w-full h-full'>
            <p className='text-gray-500'>Loading content...</p>
          </div>
        )}

        <button
          className='absolute top-3 right-3 bg-white/80 rounded-full p-1 text-neutral-800 hover:bg-white'
          onClick={close}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>,
    document.getElementById('root')
  );
}

const HimachalReelCard = ({ title, description, thumbnail }) => {
  const [overlay, setOverlay] = useState(false);
  return (
    <div
      onClick={() => setOverlay(!overlay)}
      className='relative shrink-0 bg-white rounded-3xl shadow-lg overflow-hidden w-72 h-96 group'
    >
      <Overlay visible={overlay} close={() => setOverlay(false)} />
      <img src={thumbnail} alt={title} className='h-full object-cover' />
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300'></div>
      <div className='absolute bottom-0 w-full p-4 bg-white/30 backdrop-blur-md shadow-lg'>
        <h3 className='text-xl font-bold text-neutral-100'>{title}</h3>
        <p className='text-sm text-neutral-100 mt-2'>{description}</p>
      </div>
    </div>
  );
};

export default HimachalReelCard;
