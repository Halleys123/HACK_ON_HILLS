import React from 'react';
import { createPortal } from 'react-dom';

export default function Overlay({ children, visible = false }) {
  if (!visible) return null;
  return createPortal(
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center'>
      {children}
    </div>,
    document.getElementById('root')
  );
}
