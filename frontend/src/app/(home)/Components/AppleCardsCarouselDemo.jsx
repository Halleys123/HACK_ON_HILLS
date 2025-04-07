'use client';
import Image from 'next/image';
import React from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className='w-full h-full'>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent1 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4 flex flex-col items-center justify-center '
          >
            <div className='flex items-center rounded-2xl justify-center md:h-[100%] md:w-[91%] overflow-hidden mb-4 '>
              <Image
                src='/images/stargazecard1.jpg.webp'
                alt='Macbook mockup from Aceternity UI'
                height='500'
                width='500'
                className='md:w-full md:h-full h-full w-full mx-auto object-contain'
              />
            </div>
            <p className='text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto text-justify'>
              {' '}
              <span className='font-bold text-neutral-700'>
                Best Spot: Spiti Valley{' '}
              </span>
              Escape to Spiti Valley, where the heavens spill stars like poetry.
              At <b>14,000 feet</b>, away from city lights, the night sky
              becomes a living canvas. Lie back, sip some chai, and watch
              galaxies swirl in silence. It’s not just stargazing—it’s soul
              searching. The Milky Way here isn’t a distant dream, it's your
              ceiling for the night. Perfect for seekers, lovers of calm, and
              anyone who needs to feel small—in the best way.
            </p>
          </div>
        );
      })}
    </>
  );
};
const DummyContent2 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4 flex flex-col items-center justify-center '
          >
            <div className='flex items-center rounded-2xl justify-center md:h-[100%] md:w-[91%] overflow-hidden mb-4 '>
              <Image
                src='/images/airballooncard2.jpg.webp'
                alt='Hot Air Balloon'
                height='500'
                width='500'
                className='md:w-full md:h-full h-full w-full mx-auto object-contain'
              />
            </div>
            <p className='text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto text-justify'>
              {' '}
              <span className='font-bold text-neutral-700'>Best Spot: </span>
              Vashisht near Manali (seasonal) Rise gently above apple orchards,
              meandering rivers, and sleepy Himalayan hamlets. The silence is
              surreal—only the flame’s roar and birds accompanying you. Hot air
              ballooning near Manali offers views you can't imagine from the
              ground. Float over snow-peaked ridges at sunrise, when Himachal
              blushes gold. It’s not just sightseeing—it’s like meditating
              mid-air. Peaceful. Majestic. Unforgettable.
            </p>
          </div>
        );
      })}
    </>
  );
};
const DummyContent3 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4 flex flex-col items-center justify-center '
          >
            <div className='flex items-center rounded-2xl justify-center md:h-[100%] md:w-[91%] overflow-hidden mb-4 '>
              <Image
                src='/images/trekkingcard3.jpg.webp'
                alt='Macbook mockup from Aceternity UI'
                height='500'
                width='500'
                className='md:w-full md:h-full h-full w-full mx-auto object-contain'
              />
            </div>
            <p className='text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto text-justify'>
              {' '}
              <span className='font-bold text-neutral-700'>Best Spot: </span>
              Triund, Kareri Lake, Yula Kanda, Kheer Ganga, Mani-Mahesh or
              Hampta Pass Lace up for trails that whisper stories of ancient
              deodar trees and cloud-kissed peaks. Triund offers a
              beginner-friendly, soul-refreshing trek above McLeod Ganj. For
              more thrill, the Hampta Pass trek connects lush valleys to snow
              deserts. The cool breeze, local shepherds, and Dhauladhar views
              will leave you breathless—in awe, not fatigue. Each step isn't
              just uphill, it’s upward in spirit.
            </p>
          </div>
        );
      })}
    </>
  );
};
const DummyContent4 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4 flex flex-col items-center justify-center '
          >
            <div className='flex items-center rounded-2xl justify-center md:h-[100%] md:w-[91%] overflow-hidden mb-4 '>
              <Image
                src='/images/paraglidingcard4.jpg.webp'
                alt='Macbook mockup from Aceternity UI'
                height='500'
                width='500'
                className='md:w-full md:h-full h-full w-full mx-auto object-contain'
              />
            </div>
            <p className='text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto text-justify'>
              {' '}
              <span className='font-bold text-neutral-700'>Best Spot:</span> Bir
              Billing Fly from the very skies that inspired tales of gods and
              eagles. Bir Billing is Asia’s best paragliding site, offering
              smooth winds, lush hills, and panoramic Himalayan views. Take off
              from 8,000 feet and soar like a leaf on wind’s will. As you glide
              silently over pine forests and tiny hamlets, the worries of the
              world shrink. It’s freedom, Himachali-style.
            </p>
          </div>
        );
      })}
    </>
  );
};
const DummyContent5 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4 flex flex-col items-center justify-center '
          >
            <div className='flex items-center rounded-2xl justify-center md:h-[100%] md:w-[91%] overflow-hidden mb-4 '>
              <Image
                src='/images/raftingcard5.jpg.webp'
                alt='Macbook mockup from Aceternity UI'
                height='500'
                width='500'
                className='md:w-full md:h-full h-full w-full mx-auto object-contain'
              />
            </div>
            <p className='text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto text-justify'>
              {' '}
              <span className='font-bold text-neutral-700'>Best Spot: </span>
              Beas River, Kullu Adrenaline meets alpine in the icy rapids of
              Beas. Kullu offers Grade II and III rapids—safe yet thrilling.
              Glide between pine-covered banks, past apple orchards, and under
              wooden suspension bridges. It's wild, wet, and deeply freeing.
              Whether you're a beginner or a thrill-seeker, rafting here feels
              like dancing with the river. Bonus? Snow-capped mountains cheer
              you on the entire route.
            </p>
          </div>
        );
      })}
    </>
  );
};
const DummyContent6 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4 flex flex-col items-center justify-center '
          >
            <div className='flex items-center rounded-2xl justify-center md:h-[100%] md:w-[91%] overflow-hidden mb-4 '>
              <Image
                src='/images/skicard6.jpg.webp'
                alt='Macbook mockup from Aceternity UI'
                height='500'
                width='500'
                className='md:w-full md:h-full h-full w-full mx-auto object-contain'
              />
            </div>
            <p className='text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto text-justify'>
              {' '}
              <span className='font-bold text-neutral-700'>Best Spot:</span>
              Solang Valley / Narkanda Come winter, Himachal transforms into a
              powdery playground. Solang Valley near Manali is perfect for
              beginners, while Narkanda is your peaceful alpine secret. Learn to
              glide, fall, laugh, and stand again—each move echoing through
              snow-draped silence. Whether you’re carving slopes or sipping
              cocoa in a wooden cabin, the magic of Himachali winter is
              unforgettable. You don’t just ski here—you float.
            </p>
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: 'Witness the galaxy from the Himalayas',
    title: 'Star Gazing',
    src: '/images/milkyway.jpg.webp',
    content: <DummyContent1 />,
  },
  {
    category: 'Soar above the valleys of Himachal',
    title: 'Hot Air Balloon',
    src: '/images/airballoon.jpg.webp',
    content: <DummyContent2 />,
  },
  {
    category: 'Explore majestic trails & alpine lakes',
    title: 'Trekking',
    src: '/images/trekking.jpg.webp',
    content: <DummyContent3 />,
  },

  {
    category: 'Fly with the winds in Bir Billing',
    title: 'Paragliding',
    src: '/images/paragliding.jpg.webp',
    content: <DummyContent4 />,
  },
  {
    category: 'Conquer the rapids of the Beas & Sutlej',
    title: 'River Rafting',
    src: '/images/rafting.jpg.webp',
    content: <DummyContent5 />,
  },
  {
    category: 'Glide through snow in Solang & Narkanda',
    title: 'Skiing & Snowboarding',
    src: '/images/skiing.jpg.webp',
    content: <DummyContent6 />,
  },
];
