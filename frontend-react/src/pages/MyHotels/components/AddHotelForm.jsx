import Loading from '@/components/Loading';
import useLoading from '@/hooks/useLoading';
import { useMessage } from '@/hooks/useMessage';
import customFetch from '@/utils/Fetch';
import { MapPin, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Map marker component that handles clicks
const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lng, e.latlng.lat]); // Store as [longitude, latitude] for MongoDB
    },
  });

  return position ? (
    <Marker
      position={[position[1], position[0]]} // Display as [latitude, longitude] for Leaflet
      interactive={false}
    />
  ) : null;
};

const AddHotel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    hotelName: '',
    description: '',
    address: '',
    state: '',
    city: '',
    country: '',
    zipCode: '',
    coordinates: null, // Will store [longitude, latitude]
  });

  const [errors, setErrors] = useState({});
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to center of India
  const [zoom, setZoom] = useState(5);
  const message = useMessage();
  const {
    loading,
    setLoading,
    setMessage,
    message: loaderMessage,
  } = useLoading();

  // Try to get user's location for initial map center
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setZoom(13);
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.hotelName.trim())
      newErrors.hotelName = 'Hotel name is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.coordinates)
      newErrors.coordinates = 'Please select a location on the map';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Geocode address to get coordinates
  const geocodeAddress = async () => {
    if (!formData.address || !formData.city || !formData.country) {
      message.error(
        'Error',
        'Please fill in address, city, and country before geocoding'
      );
      return;
    }

    setLoading(true);
    setMessage('Finding location...');

    const query = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}`;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lon, lat } = data[0];
        setFormData((prev) => ({
          ...prev,
          coordinates: [parseFloat(lon), parseFloat(lat)],
        }));
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setZoom(16);
        message.success(
          'Location Found',
          'Map has been centered to the address'
        );
      } else {
        message.warning(
          'Location Not Found',
          'Try selecting the location manually on the map'
        );
      }
    } catch (error) {
      message.error('Error', 'Failed to geocode address');
      console.error('Geocoding error:', error);
    } finally {
      setLoading(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      message.error(
        'Validation Error',
        'Please fix the errors before submitting'
      );
      return;
    }

    setLoading(true);
    setMessage('Adding Hotel...');

    try {
      const response = await customFetch('/hotel', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.error) {
        message.error('Error', response.data.message || 'Something went wrong');
      } else {
        message.success('Success', response.data.message);
        onClose();
      }
    } catch (error) {
      message.error('Error', 'Failed to add hotel');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
      <div className='flex flex-row justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold mb-6 text-left text-gray-800'>
          Add New Hotel
        </h2>
        <X size={18} className='cursor-pointer' onClick={onClose} />
      </div>
      <Loading visible={loading} text={loaderMessage} />

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Left column - Form fields */}
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='hotelName'
                className='block text-sm font-medium text-gray-700'
              >
                Hotel Name *
              </label>
              <input
                type='text'
                id='hotelName'
                name='hotelName'
                value={formData.hotelName}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 rounded-md border ${
                  errors.hotelName ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              />
              {errors.hotelName && (
                <p className='mt-1 text-sm text-red-500'>{errors.hotelName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'
              >
                Description *
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows='3'
                className={`mt-1 block px-3 py-2 w-full rounded-md border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              ></textarea>
              {errors.description && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Address *
              </label>
              <input
                type='text'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 block px-3 py-2 w-full rounded-md border ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              />
              {errors.address && (
                <p className='mt-1 text-sm text-red-500'>{errors.address}</p>
              )}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium text-gray-700'
                >
                  City *
                </label>
                <input
                  type='text'
                  id='city'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md px-3 py-2 border ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                />
                {errors.city && (
                  <p className='mt-1 text-sm text-red-500'>{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='state'
                  className='block text-sm font-medium text-gray-700'
                >
                  State *
                </label>
                <input
                  type='text'
                  id='state'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md px-3 py-2 border ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                />
                {errors.state && (
                  <p className='mt-1 text-sm text-red-500'>{errors.state}</p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium text-gray-700'
                >
                  Country *
                </label>
                <input
                  type='text'
                  id='country'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md px-3 py-2 border ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                />
                {errors.country && (
                  <p className='mt-1 text-sm text-red-500'>{errors.country}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='zipCode'
                  className='block text-sm font-medium text-gray-700'
                >
                  Zip Code *
                </label>
                <input
                  type='text'
                  id='zipCode'
                  name='zipCode'
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md px-3 py-2 border ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                />
                {errors.zipCode && (
                  <p className='mt-1 text-sm text-red-500'>{errors.zipCode}</p>
                )}
              </div>
            </div>

            <button
              type='button'
              onClick={geocodeAddress}
              className='w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            >
              <MapPin size={16} className='mr-2' />
              Find Address on Map
            </button>
          </div>

          {/* Right column - Map */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Hotel Location *
            </label>
            <div className='h-[400px] rounded-lg overflow-hidden border border-gray-300 shadow-sm'>
              <MapContainer
                center={mapCenter}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <LocationMarker
                  position={formData.coordinates}
                  setPosition={(coords) => {
                    setFormData((prev) => ({ ...prev, coordinates: coords }));
                  }}
                />
              </MapContainer>
            </div>
            {formData.coordinates ? (
              <div className='text-xs text-gray-600'>
                Selected coordinates: {formData.coordinates[1].toFixed(6)},{' '}
                {formData.coordinates[0].toFixed(6)}
              </div>
            ) : (
              <div className='text-xs text-gray-600'>
                Click on the map to set the hotel location
              </div>
            )}
            {errors.coordinates && (
              <p className='text-sm text-red-500'>{errors.coordinates}</p>
            )}
          </div>
        </div>

        <div className='flex justify-end gap-3 pt-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
