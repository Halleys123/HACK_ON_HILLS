import React, { useEffect, useRef, useState } from 'react';
import FiltersSections from './components/FiltersSections';
import HotelCard from './components/HotelCard';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '@assets/marker.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import customFetch from '@/utils/Fetch';
import { useMessage } from '@/hooks/useMessage';
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/Loading';
import { debounce } from 'lodash'; // You'll need to install lodash

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
  const markersLayer = useRef(null);

  const message = useMessage();
  const {
    loading,
    setLoading,
    message: loaderMessage,
    setMessage,
  } = useLoading();

  const [hotels, setHotels] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  // Debounced function to fetch hotels when map moves
  const debouncedFetchHotels = useRef(
    debounce((bounds) => {
      getHotels(bounds);
    }, 500)
  ).current;

  async function getHotels(bounds = null) {
    setLoading(true);
    setMessage('Fetching Hotels...');

    // Build query parameters
    let queryParams = '';
    if (bounds) {
      // Format: west,south,east,north (minLng,minLat,maxLng,maxLat)
      queryParams = `?bounds=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
    }

    const response = await customFetch(`/hotel${queryParams}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setLoading(false);

    if (response.error) {
      message.error('Error Occurred', response.data.message);
    } else {
      const hotelData = response.data.data.hotels;
      setHotels(hotelData);
      setTotalResults(response.data.data.pagination?.total || hotelData.length);
      updateMapMarkers(hotelData);
      message.success('Success', response.data.message);
    }
  }

  // Function to update markers on the map
  function updateMapMarkers(hotelData) {
    if (!mapInstance.current) return;

    // Clear existing markers
    if (markersLayer.current) {
      markersLayer.current.clearLayers();
    } else {
      markersLayer.current = L.layerGroup().addTo(mapInstance.current);
    }

    // Add new markers
    hotelData.forEach((hotel) => {
      if (
        hotel.coordinates &&
        Array.isArray(hotel.coordinates) &&
        hotel.coordinates.length === 2
      ) {
        // Create marker at hotel coordinates [lng, lat]
        const marker = L.marker([
          hotel.coordinates[1],
          hotel.coordinates[0],
        ]).addTo(markersLayer.current);

        // Create popup with hotel info
        marker.bindPopup(`
          <div class="hotel-popup">
            <h3 class="font-bold">${hotel.hotelName}</h3>
            <p>${hotel.address}, ${hotel.city}</p>
            <p class="text-sm">Rating: ${hotel.rating}/5</p>
            <button 
              class="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              onclick="window.location.href='/hotels/${hotel._id}'"
            >
              View Details
            </button>
          </div>
        `);
      }
    });
  }

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize the map - center on a default location (adjust as needed)
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // Center on India

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Create a layer group for markers
      markersLayer.current = L.layerGroup().addTo(map);

      // Get initial hotels
      const initialBounds = map.getBounds();
      setMapBounds(initialBounds);
      getHotels(initialBounds);

      // Add event listener for map movement
      map.on('moveend', () => {
        const newBounds = map.getBounds();
        setMapBounds(newBounds);
        debouncedFetchHotels(newBounds);
      });

      mapInstance.current = map;
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      debouncedFetchHotels.cancel();
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
              {totalResults} Results Found
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

          {/* Map instructions */}
          <div className='bg-blue-50 p-3 rounded-md text-sm text-blue-700 mb-2'>
            <p className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Pan and zoom the map to see hotels in different areas. Results
              update automatically.
            </p>
          </div>
        </div>

        {/* Hotel cards */}
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pb-4'>
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <HotelCard
                key={hotel._id}
                title={hotel.hotelName}
                location={`${hotel.city}, ${hotel.state}`}
                rating={hotel.rating}
                id={hotel._id}
                image={
                  'http://localhost:3000/api/v1/images/' + hotel._id + '.jpg'
                }
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              />
            ))
          ) : (
            <div className='col-span-full text-center py-8 text-gray-500'>
              No hotels found in this area. Try moving the map to a different
              location.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
