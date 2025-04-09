import React, { useState, useEffect } from 'react';
import { Calendar, Star, ChevronRight, ChevronLeft, Users } from 'lucide-react';
import Footer from '@/components/Footer';

import shimla from '@assets/shimla.jpg';
import manali from '@assets/manali.jpg';
import dharamshala from '@assets/dharamshala.jpg';
import dalhousie from '@assets/kullu.jpg';
import raft from '@assets/raft.webp';
import buddha from '@assets/buddha.jpg';
import culture from '@assets/culture.jpg';
import nature from '@assets/nature.jpg';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const destinations = [
    {
      id: 1,
      name: 'Shimla',
      image: shimla,
      description: 'The Summer Capital of British India',
    },
    {
      id: 2,
      name: 'Manali',
      image: manali,
      description: 'Valley of Gods with snow-capped mountains',
    },
    {
      id: 3,
      name: 'Dharamshala',
      image: dharamshala,
      description: 'Home to the Dalai Lama and Tibetan culture',
    },
    {
      id: 4,
      name: 'Dalhousie',
      image: dalhousie,
      description: 'Charming hill station with colonial architecture',
    },
  ];

  const experiences = [
    {
      id: 1,
      name: 'Adventure',
      image: raft,
      activities: ['Paragliding', 'Trekking', 'River Rafting'],
    },
    {
      id: 2,
      name: 'Spiritual',
      image: buddha,
      activities: ['Temples', 'Monasteries', 'Meditation'],
    },
    {
      id: 3,
      name: 'Cultural',
      image: culture,
      activities: ['Local Festivals', 'Traditional Cuisine', 'Folk Music'],
    },
    {
      id: 4,
      name: 'Nature',
      image: nature,
      activities: ['Wildlife', 'Waterfalls', 'Apple Orchards'],
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sandeep Kumar',
      text: 'Our stay at Hotel Geetanjali in Dalhousie was wonderful. The staff was very cooperative and the room offered a stunning view of the Peer Panjal Mountain Range.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Anil Kumar Mehta',
      text: 'We stayed at HPTDC Hotel T-BUD in Palampur for three days. The reception staff were pleasant and helpful. Our overall experience was excellent!',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Jasleen Singh',
      text: 'We stayed at Chail Palace hotel - tranquil, peaceful and a complete place in itself. We did not venture out of the property for 2 days and had a wonderful family holiday.',
      rating: 4.9,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='relative h-screen'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${shimla})` }}
        ></div>
        <div className='absolute inset-0 bg-black opacity-40'></div>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-white px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl md:text-6xl font-bold text-center mb-4'>
            Discover Himachal Pradesh
          </h1>
          <p className='text-xl md:text-2xl text-center mb-8'>
            A Destination for All Seasons and All Reasons
          </p>
          <div className='bg-white/10 backdrop-blur-md p-6 rounded-lg w-full max-w-4xl'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='flex flex-col'>
                <label className='text-sm font-medium mb-2'>Check In</label>
                <button className='flex items-center justify-between bg-white text-gray-800 p-3 rounded-md'>
                  <div className='flex items-center'>
                    <Calendar className='h-5 w-5 text-gray-500 mr-2' />
                    <span>Add dates</span>
                  </div>
                  <ChevronRight size={20} className='text-gray-500' />
                </button>
              </div>

              <div className='flex flex-col'>
                <label className='text-sm font-medium mb-2'>Check Out</label>
                <button className='flex items-center justify-between bg-white text-gray-800 p-3 rounded-md'>
                  <div className='flex items-center'>
                    <Calendar className='h-5 w-5 text-gray-500 mr-2' />
                    <span>Add dates</span>
                  </div>
                  <ChevronRight size={20} className='text-gray-500' />
                </button>
              </div>

              <div className='flex flex-col'>
                <label className='text-sm font-medium mb-2'>Guests</label>
                <div className='relative'>
                  <button
                    onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                    className='flex items-center justify-between w-full bg-white text-gray-800 p-3 rounded-md'
                  >
                    <div className='flex items-center'>
                      <Users className='h-5 w-5 text-gray-500 mr-2' />
                      <span>
                        {adults + children} guest
                        {adults + children !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <ChevronRight size={20} className='text-gray-500' />
                  </button>

                  {isGuestDropdownOpen && (
                    <div className='absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 p-4'>
                      <div className='flex justify-between items-center mb-4'>
                        <span>Adults</span>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={() => adults > 1 && setAdults(adults - 1)}
                            className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'
                          >
                            -
                          </button>
                          <span>{adults}</span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Children</span>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={() =>
                              children > 0 && setChildren(children - 1)
                            }
                            className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'
                          >
                            -
                          </button>
                          <span>{children}</span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className='w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition'>
              Explore Accommodations
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className='py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Welcome to Himachal Pradesh
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Himachal Pradesh, known for its rich natural heritage, is amongst
            the top tourist destinations in India. With breathtaking landscapes,
            snow-capped mountains, lush valleys, and vibrant culture, Himachal
            offers an unforgettable experience for all travelers.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition'>
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>160+ Lakh</h3>
              <p className='text-gray-600'>Annual Visitors</p>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition'>
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>5 National Parks</h3>
              <p className='text-gray-600'>Rich Biodiversity</p>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition'>
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>33+ Sanctuaries</h3>
              <p className='text-gray-600'>Wildlife Protection</p>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition'>
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>All Seasons</h3>
              <p className='text-gray-600'>Year-round Destination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <div className='py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Top Destinations in Himachal
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Explore the most popular destinations that showcase the beauty and
              culture of Himachal Pradesh
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition'
              >
                <div className='h-48 overflow-hidden'>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='text-xl font-semibold text-gray-800'>
                    {destination.name}
                  </h3>
                  <p className='text-gray-600 mt-2'>
                    {destination.description}
                  </p>
                  <button className='mt-4 text-blue-600 font-medium flex items-center'>
                    Explore <ChevronRight size={16} className='ml-1' />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='text-center mt-10'>
            <button className='inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 bg-white rounded-md font-medium hover:bg-blue-50 transition'>
              View All Destinations <ChevronRight size={16} className='ml-1' />
            </button>
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div className='py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Experiences for Everyone
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            From thrilling adventures to peaceful retreats, Himachal Pradesh
            offers diverse experiences
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition'
            >
              <div className='h-48 overflow-hidden'>
                <img
                  src={experience.image}
                  alt={experience.name}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                />
              </div>
              <div className='p-4'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {experience.name}
                </h3>
                <ul className='mt-2 space-y-1'>
                  {experience.activities.map((activity, index) => (
                    <li key={index} className='text-gray-600 flex items-center'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mr-2'></span>
                      {activity}
                    </li>
                  ))}
                </ul>
                <button className='mt-4 text-blue-600 font-medium flex items-center'>
                  Discover <ChevronRight size={16} className='ml-1' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className='py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              What Travelers Say
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Hear from visitors who have experienced the beauty and hospitality
              of Himachal Pradesh
            </p>
          </div>

          <div className='relative'>
            <div className='overflow-hidden'>
              <div className='flex justify-center'>
                <div className='bg-white rounded-lg shadow-md p-6 max-w-2xl'>
                  <div className='flex items-center mb-4'>
                    <div className='flex'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < Math.floor(testimonials[currentSlide].rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }
                          fill={
                            i < Math.floor(testimonials[currentSlide].rating)
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                      ))}
                    </div>
                    <span className='ml-2 text-gray-600'>
                      {testimonials[currentSlide].rating}
                    </span>
                  </div>
                  <p className='text-gray-700 italic mb-4'>
                    "{testimonials[currentSlide].text}"
                  </p>
                  <p className='font-medium text-gray-900'>
                    - {testimonials[currentSlide].name}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md'
            >
              <ChevronLeft size={24} className='text-gray-600' />
            </button>

            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )
              }
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md'
            >
              <ChevronRight size={24} className='text-gray-600' />
            </button>
          </div>

          <div className='flex justify-center mt-6'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className='py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='bg-blue-600 rounded-xl p-8 md:p-12'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              Stay Updated with Himachal Tourism
            </h2>
            <p className='text-blue-100 mb-6'>
              Subscribe to our newsletter for travel tips, upcoming events, and
              exclusive offers
            </p>
            <div className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
              <input
                type='email'
                placeholder='Your email address'
                className='flex-1 px-4 py-3 rounded-md focus:outline-none'
              />
              <button className='px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
