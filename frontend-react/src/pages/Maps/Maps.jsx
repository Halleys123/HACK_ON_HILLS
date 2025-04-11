import React, { useEffect, useRef, useState } from 'react';
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
import customFetch from '@/utils/Fetch';
import { useMessage } from '@/hooks/useMessage';
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/Loading';

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

  const message = useMessage();
  const {
    loading,
    setLoading,
    message: loaderMessage,
    setMessage,
  } = useLoading();

  const [hotels, setHotels] = useState([]);

  async function getHotels() {
    // simple fetch no need for checking location etc
    setLoading(true);
    setMessage('Fetching Hotels...');
    const response = await customFetch('/hotel', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setLoading(false);
    if (response.error) {
      message.error('Error Occured', response.data.message);
    } else {
      setHotels(response.data.data.hotels);
      console.log(response.data.data.hotels);
      message.success('Success', response.data.message);
    }
  }

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
      getHotels();
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
      <Loading visible={loading} text={loaderMessage} />
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
            className='z-10 w-full aspect-video bg-neutral-100 overflow-hidden rounded-lg shadow-sm'
            style={{ height: '400px' }}
          ></div>
        </div>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pb-4'>
          {hotels.map((hotel) => {
            console.log(hotel);
            return (
              <HotelCard
                key={hotel._id}
                title={hotel.hotelName}
                location={hotel.state}
                rating={hotel.rating}
                id={hotel._id}
                image={
                  'http://localhost:3000/api/v1/images/' + hotel._id + '.jpg'
                }
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// todo: chatbot
// todo: maps
// todo: room image add
// todo: database structure
