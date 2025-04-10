import React from 'react';
import HimachalReelCard from './HimachalReelCard';

import manali from '@/assets/manali.jpg';

const reels = [
  {
    title: 'Snowfall in Manali',
    description: 'Captured during peak winter ❄️',
    thumbnail: manali,
  },
  {
    title: 'Spiti Valley',
    description: 'Moon-like landscapes & desert beauty 🌄',
    thumbnail: '/reels/spiti.jpg',
  },
  {
    title: 'Shimla Streets',
    description: 'Evenings filled with charm 🏙️',
    thumbnail: '/reels/shimla.jpg',
  },
  {
    title: 'Dalhousie Views',
    description: 'Hazy hills and clear skies 🌤️',
    thumbnail: '/reels/dalhousie.jpg',
  },
  {
    title: 'Kasol Vibes',
    description: 'Chill scenes by the Parvati River 🌊',
    thumbnail: '/reels/kasol.jpg',
  },
];

const ReelsSection = () => {
  return (
    <section className='py-16 px-4'>
      <h2 className='text-3xl font-bold mb-8 text-gray-800'>Instagram Reels</h2>
      <div className='flex space-x-6 overflow-x-auto scrollbar-hide'>
        {reels.map((reel, index) => (
          <HimachalReelCard key={index} {...reel} />
        ))}
      </div>
    </section>
  );
};

export default ReelsSection;
