'use client';
import React from 'react';
import { LayoutGrid } from '@/components/ui/layout-grid';

export function LayoutGridDemo() {
  return (
    <div className='h-screen py-10 w-full'>
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>Flora & Fauna</p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        A Green pearl in the Himalayan crown, Himachal Pradesh is blessed with a
        rich flora and fauna that graces the land with grandeur and majesty.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>
        Himachali Cuisine
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        Community feasts prepared for 'Dhams' by hereditary clans of Boti Chefs
        is where the traditional flavors are at their best.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>
        Culture & Heritage
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>
        Fair & Festivals
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        Nurtured by centuries of tradition, the warm and hospitable people of
        Himachal Pradesh celebrate life in hosting a vaniely variety of fairs
        and festivals to sometimes honour gods and goddesses and on many other
        occasions to socialize by marking the season, be it with hope when
        spring is breaking out or by dancing and dining after the harvests
        bounty is done with.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: 'md:col-span-2',
    thumbnail: '/images/flora-fauna.jpg.webp',
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: 'col-span-1',
    thumbnail: '/images/dham.jpg.webp',
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: 'col-span-1',
    thumbnail: '/images/culture.jpg.webp',
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: 'md:col-span-2',
    thumbnail: '/images/fair.jpg',
  },
];
