import React from 'react';
import Button from '@/components/Button';
import InputMaps from './InputMaps';
import DropdownMaps from './DropdownMaps';
import { Minus, Plus } from 'lucide-react';

export default function FiltersSections() {
  function handleMinus() {
    const input = document.getElementById('number-of-guests');
    const value = parseInt(input.value) || 0;
    if (value > 0) {
      input.value = value - 1;
    }
  }
  function handlePlus() {
    const input = document.getElementById('number-of-guests');
    const value = parseInt(input.value) || 0;
    input.value = value + 1;
  }
  return (
    <div id='filters-area' className='flex flex-col gap-6 flex-1/4'>
      <div className='flex flex-row gap-2 items-end justify-between'>
        <span className='text-2xl font-semibold text-neutral-700'>Filters</span>
        <span className='text-indigo-500 hover:text-indigo-600 cursor-pointer text-md font-semibold w-fit'>
          Reset
        </span>
      </div>
      <div className='flex flex-col gap-4'>
        <span className='text-lg font-semibold text-neutral-700'>
          Price Range
        </span>
        <div className='flex flex-row gap-2'>
          <InputMaps placeholder='From' type='text' />
          <InputMaps placeholder='To' type='text' />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <span className='text-lg font-semibold text-neutral-700'>Rating</span>
        <DropdownMaps
          placeholder='Select Rating'
          options={[
            { value: '', label: 'All' },
            { value: '1', label: '1 Star' },
            { value: '2', label: '2 Stars' },
            { value: '3', label: '3 Stars' },
            { value: '4', label: '4 Stars' },
            { value: '5', label: '5 Stars' },
          ]}
          className='w-full'
        />
      </div>
      <div className='h-1 border-t border-neutral-300 my-4'></div>
      <div className='flex flex-col gap-4'>
        <span className='text-lg font-semibold text-neutral-700'>
          Number of Guests
        </span>
        <div className='relative'>
          <Minus
            onClick={handleMinus}
            className='absolute top-1/2 left-3 cursor-pointer -translate-y-1/2 text-neutral-500'
          />
          <InputMaps
            className='!max-w-none text-center'
            placeholder='Number of Guests'
            type='text'
            id='number-of-guests'
            value='0'
          />
          <Plus
            onClick={handlePlus}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500'
          />
        </div>
      </div>
    </div>
  );
}
