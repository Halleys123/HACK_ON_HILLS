import Dropdown from '@/components/Dropdown';
import { Calendar, Filter, RefreshCcw, Search } from 'lucide-react';
import React from 'react';

export default function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  hotelsList = [],
  setSelectedHotel,
}) {
  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4'>
      <div className='relative flex-1 max-w-md'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search size={18} className='text-gray-400' />
        </div>
        <input
          type='text'
          className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder='Search by guest name or room number'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='flex space-x-2'>
        <button className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          <Filter size={16} className='mr-2' />
          Filters
        </button>
        <button className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          <Calendar size={16} className='mr-2' />
          Today
        </button>
        <button className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          <RefreshCcw size={16} className='mr-2' />
        </button>
        <Dropdown
          options={hotelsList}
          className='min-w-64'
          onSelect={(value) => {
            setSelectedHotel(value);
          }}
        />
      </div>
    </div>
  );
}
