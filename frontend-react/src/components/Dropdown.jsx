import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Dropdown({
  options,
  placeholder = 'Select an option',
  className = '',
  onSelect,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block w-full ${className}`}
    >
      <input
        {...props}
        readOnly
        className='hidden'
        type='text'
        value={selected?.value}
      />
      <div
        className='flex justify-between items-center border border-gray-300 rounded-sm px-3 py-2 cursor-pointer'
        onClick={toggleDropdown}
      >
        <span className='text-sm text-gray-700'>
          {selected ? selected.label : placeholder}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isOpen && (
        <ul className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-auto'>
          {options.map((option, index) => (
            <li
              key={index}
              className='px-3 py-2 shrink-0 text-sm hover:bg-gray-100 cursor-pointer'
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
