import React, { useEffect, useRef } from 'react';
import FiltersSections from './components/FiltersSections';
import landing from '@/assets/landing.jpg';
import HotelCard from './components/HotelCard';
import { useNavigate } from 'react-router-dom';

// Import Leaflet (you'll need to install these packages)
// npm install leaflet react-leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker icon assets to fix the broken marker icon issue
import markerIcon from '@assets/marker.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

const hotels = [
  {
    id: 1,
    image: landing,
    title: 'Montmartre Majesty Hotel',
    location: 'Marseille, France',
    price: '160',
    originalPrice: '250',
    rating: 4.7,
    reviews: 2578,
    coordinates: [43.296482, 5.36978], // Marseille coordinates
  },
  {
    id: 2,
    image: landing,
    title: 'Elysée Retreat',
    location: 'Paris, France',
    price: '150',
    originalPrice: '240',
    rating: 4.8,
    reviews: 1236,
    coordinates: [48.856614, 2.352222], // Paris coordinates
  },
  {
    id: 3,
    image: landing,
    title: 'Versailles Vista Inn',
    location: 'Strasbourg, France',
    price: '220',
    rating: 4.7,
    reviews: 1356,
    coordinates: [48.573405, 7.752111], // Strasbourg coordinates
  },
];

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Maps() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize the map
      const map = L.map(mapRef.current).setView([46.603354, 1.888334], 5); // Center on France

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Add markers for each hotel
      hotels.forEach((hotel) => {
        if (hotel.coordinates) {
          const marker = L.marker(hotel.coordinates).addTo(map);
          marker.bindPopup(`
            <strong>${hotel.title}</strong><br>
            ${hotel.location}<br>
            $${hotel.price}/night
          `);
        }
      });

      mapInstance.current = map;
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className='flex flex-row gap-6 p-12 mt-16 h-screen w-screen overflow-hidden'>
      <FiltersSections />
      <div
        id='map-area'
        className='pb-4 px-1 flex flex-col gap-3 flex-3/4 pt-2 ml-6 overflow-scroll'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row justify-between items-center'>
            <span className='font-mont text-lg font-semibold text-neutral-800'>
              16 Results Found
            </span>
            <div className='flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white'>
              <span className='text-sm font-mont text-gray-700'>
                Sort by: Price (Low to High)
              </span>
            </div>
          </div>
          <div
            ref={mapRef}
            id='map'
            className='w-full aspect-video bg-neutral-100 overflow-hidden rounded-lg shadow-sm'
            style={{ height: '400px' }}
          ></div>
        </div>
        <div className='flex flex-row gap-4 pb-4'>
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              {...hotel}
              onClick={() => navigate(`/hotels/${hotel.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
