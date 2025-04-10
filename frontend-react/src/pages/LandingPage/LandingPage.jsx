import React from 'react';
import Hero from './components/Hero';
import ExploreSection from './components/ExploreSection';
import ReelsSection from './components/ReelsSection';

export default function LandingPage() {
  return (
    <div className='flex flex-col gap-2 w-screen overflow-x-hidden'>
      <Hero />
      <ExploreSection />
      <ReelsSection />
    </div>
  );
}
