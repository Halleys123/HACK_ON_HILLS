import React, { useState, useEffect } from 'react';
import shimla from '@assets/shimla.jpg';
import manali from '@assets/manali.jpg';
import kullu from '@assets/kullu.jpg';
import dharamshala from '@assets/dharamshala.jpg';
import chamba from '@assets/chamba.jpg';
import milkyway from '@assets/milkyway.jpg';

import ExploreButton from './ExploreButton';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
  
  const images = [
    { src: shimla, alt: 'Shimla' },
    { src: manali, alt: 'Manali' },
    { src: kullu, alt: 'Kullu' },
    { src: dharamshala, alt: 'Dharamshala' },
    { src: chamba, alt: 'Chamba' },
    { src: milkyway, alt: 'Milky Way' },
  ];

  // Load images
  useEffect(() => {
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImgs) => {
        setLoadedImages(loadedImgs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load images", error);
      });
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div className='flex flex-col gap-4 relative'>
      <div className='flex flex-col gap-4 mt-16 h-screen overflow-hidden'>
        <div className='w-full h-5/6 relative'>
          {areImagesLoaded && (
            <div className="relative w-full h-full">
              {loadedImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      transform: 'scaleX(-1)',
                    }}
                    className='w-full h-full object-cover rounded-lg shadow-lg'
                  />
                  
                  {/* Image slider indicators - Moved inside the image container */}
                  {index === currentIndex && (
                    <div className='absolute top-8 right-8 flex space-x-3 z-30'>
                      {images.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            dotIndex === currentIndex 
                              ? 'border border-white bg-transparent' 
                              : 'bg-white'
                          }`}
                          onClick={() => handleDotClick(dotIndex)}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className='absolute top-16 left-0 h-5/6 w-full from-neutral-950/30 via-transparent to-transparent z-20'></div>
        </div>
      </div>
      
      <div className='absolute top-1/2 left-12 transform -translate-y-1/2 text-white z-30'>
        <div className='flex flex-col gap-2 w-fit px-12 py-4 rounded-2xl outline outline-neutral-400 backdrop-blur-md'>
          <h1 className='text-5xl font-bold text-white'>
            Welcome to Himachal Pradesh
          </h1>
          <p className='text-xl mt-2'>
            The land of gods, temples, and mountains
          </p>
        </div>
        <ExploreButton className='ml-8 mt-14' />
      </div>
    </div>
  );
}
