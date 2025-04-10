import React from 'react';

import manali from '@assets/manali.jpg';
// import spiti from '@assets/spiti.jpg';
import dharamshala from '@assets/dharamshala.jpg';
// import kasol from '@assets/kasol.jpg';
import shimla from '@assets/shimla.jpg';
// import bir from '@assets/bir.jpg';

const places = [
  {
    name: 'Manali',
    description:
      'A perfect blend of adventure and serenity in the Kullu Valley.',
    image: manali,
  },
  {
    name: 'Spiti Valley',
    description:
      'High-altitude desert valley with monasteries and dramatic landscapes.',
    image: '/images/spiti.jpg',
  },
  {
    name: 'Dharamshala',
    description:
      'Spiritual hub with Tibetan culture nestled in the Dhauladhar range.',
    image: dharamshala,
  },
  {
    name: 'Kasol',
    description: 'The backpacker’s paradise along the Parvati River.',
    image: 'a',
  },
  {
    name: 'Shimla',
    description: "The colonial charm of Himachal's capital, rich with history.",
    image: shimla,
  },
  {
    name: 'Bir Billing',
    description: 'The paragliding capital of India with breathtaking views.',
    image: '/images/bir.jpg',
  },
];

const ExploreSection = () => {
  return (
    <section className='py-0 bg-white'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col gap-2 items-center'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2 text-center'>
          Find Your Next Escape
        </h2>
        <span className='text-lg text-center mb-10'>
          Explore the best places in Himachal Pradesh to visit and experience
          the beauty of nature and culture.
        </span>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {places.map((place) => (
            <div
              key={place.name}
              className='rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'
            >
              <img
                src={place.image}
                alt={place.name}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                <h3 className='text-xl font-semibold'>{place.name}</h3>
                <p className='text-gray-600 text-sm mt-2'>
                  {place.description}
                </p>
                <button className='mt-4 text-indigo-600 font-medium hover:underline'>
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
