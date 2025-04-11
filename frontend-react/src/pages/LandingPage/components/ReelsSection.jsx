import React from 'react';
import HimachalReelCard from './HimachalReelCard';

import manali from '@/assets/manali.jpg';
import a from '@assets/a (1).jpg';
import b from '@assets/a (2).jpg';
import f from '@assets/a (3).jpg';
import c from '@assets/a (4).jpg';
import d from '@assets/a (5).jpg';
import e from '@assets/b (1).jpg';

const reels = [
  {
    title: 'Snowfall in Manali',
    description: 'Captured during peak winter ❄️',
    thumbnail: manali,
  },
  {
    title: 'Khajiar',
    description: 'Moon-like landscapes 🌄',
    thumbnail: c,
  },
  {
    title: 'Shimla Streets',
    description: 'Evenings filled with charm 🏙️',
    thumbnail: b,
  },
  // {
  //   title: 'Dalhousie Views',
  //   description: 'Hazy hills and clear skies 🌤️',
  //   thumbnail: a,
  // },
  {
    title: 'Bir Billing',
    description: 'Paragliding in Bir',
    thumbnail: a,
  },
  {
    title: 'Spiti Valley',
    description: 'The desert mountains of Spiti',
    thumbnail: d,
  },
  {
    title: 'Dharamshala',
    description: 'Tibetan culture and monasteries 🕉️',
    thumbnail: e,
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
