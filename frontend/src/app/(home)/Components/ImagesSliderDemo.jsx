'use client';
import { motion } from 'motion/react';
import React from 'react';
import { ImagesSlider } from '@/components/ui/images-slider';

export function ImagesSliderDemo() {
  const images = [
    '/images/keymonastry.jpg.webp',
    '/images/milkyway.jpg.webp',
    '/images/home1.jpg.webp',
  ];
  return (
    <ImagesSlider className='h-[40rem]' images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className='z-50 flex flex-col justify-center items-center'
      ></motion.div>
    </ImagesSlider>
  );
}
