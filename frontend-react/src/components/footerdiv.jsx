import React from 'react';

export default function FooterColumn({ title, items }) {
  return (
    <div className='flex flex-col space-y-4'>
      <h3 className='text-lg font-semibold mb-2 text-gray-800'>{title}</h3>
      <ul className='space-y-2 text-sm'>
        {items.map((item, idx) => (
          <li key={idx}>
            <a
              href={item.href}
              className='hover:underline hover:text-[#1f4f2b] hover:scale-105 transition-transform duration-200 ease-in-out inline-flex items-center'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='mr-2'>{/* Add an icon here if needed */}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
