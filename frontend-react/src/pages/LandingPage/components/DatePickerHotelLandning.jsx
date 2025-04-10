import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const DatePickerHotelLanding = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get current date information
  const today = new Date();

  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'Add dates';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Generate days for the calendar
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate between months
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Select a date
  const handleDateSelect = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setIsOpen(false);
  };

  // Generate calendar days
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className='h-8 w-8'></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // const date = new Date(year, month, day);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
            ${isSelected ? 'bg-blue-500 text-white' : ''}
            ${isToday && !isSelected ? 'border border-blue-500' : ''}
            ${!isSelected && !isToday ? 'hover:bg-gray-100' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className='relative'>
      <button
        className={`flex items-center justify-between w-full flex-1 max-w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 focus:outline-none ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex items-center'>
          <CalendarIcon className='h-5 w-5 text-gray-400 mr-2' />
          <span>{selectedDate ? formatDate(selectedDate) : 'Add dates'}</span>
        </div>
        <svg
          className='h-5 w-5 text-gray-400'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            transform: 'translateY(-320px)',
          }}
          className='absolute t-0 mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-lg z-10'
        >
          <div className='mb-2 flex items-center justify-between'>
            <button
              onClick={prevMonth}
              className='p-1 hover:bg-gray-100 rounded-full'
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className='text-sm font-medium'>
              {currentMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h3>
            <button
              onClick={nextMonth}
              className='p-1 hover:bg-gray-100 rounded-full'
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className='grid grid-cols-7 gap-1 mb-1'>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div
                key={day}
                className='h-8 w-8 flex items-center justify-center text-xs text-gray-500'
              >
                {day}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-7 gap-1'>{renderCalendar()}</div>
        </div>
      )}
    </div>
  );
};

export default DatePickerHotelLanding;
