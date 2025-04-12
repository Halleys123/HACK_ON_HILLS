import React from 'react';
import FooterColumn from './footerdiv.jsx';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import AiAssistant from './Puffu.jsx';
import logo from '@assets/logo.png';

export default function Footer() {
  const footerData = [
    {
      title: 'Tourism Info',
      items: [
        { label: 'Latest News', href: '#' },
        { label: 'Heritage Attractions', href: '#' },
        { label: 'Hotel/Homestay List', href: '#' },
        { label: 'Tourist Statistics', href: '#' },
      ],
    },
    {
      title: 'Downloads',
      items: [
        {
          label: 'SIA Reports',
          href: 'https://himachaltourism.gov.in/wp-content/uploads/2025/03/SIA_Study_English-For_Land_Acquisition_For_Tourist-Complex_-Seri_Nadaun.pdf',
        },
        {
          label: 'Airport Reports',
          href: 'https://himachaltourism.gov.in/wp-content/uploads/2024/07/Withdrawal-of-SIA-Notification-for-Land-Acquisition-at-Seri-Nadaun.pdf',
        },
        {
          label: 'Notification - Kangra',
          href: 'https://himachaltourism.gov.in/wp-content/uploads/2025/01/SIA-Notification-for-Land-Acquisition-at-Village-Seri_Nadaun.pdf',
        },
        {
          label: 'R&P Rules',
          href: 'https://himachaltourism.gov.in/r-p-rules-for-various-posts/',
        },
      ],
    },
    {
      title: 'Schemes & Policies',
      items: [
        {
          label: 'Homestay Rules 2025',
          href: 'https://himachaltourism.gov.in/wp-content/uploads/2018/06/Himachal-Pradesh-Home-Stay-Scheme-2008.pdf',
        },
        {
          label: 'Water Sports Policy',
          href: 'https://himachaltourism.gov.in/wp-content/uploads/2018/09/58e76f954d44e_River-Rafting-Rules-2005.pdf',
        },
        {
          label: 'Tourism Policy 2019',
          href: 'https://himachaltourism.gov.in/wp-content/uploads/2019/09/Himachal-Pradesh-Tourism-Policy-2019.pdf',
        },
      ],
    },
    {
      title: 'Important Links',
      items: [
        { label: 'Govt of India', href: 'https://www.india.gov.in/' },
        {
          label: 'Tourism GIS Portal',
          href: 'http://www.agisac.gov.in/tourgis/',
        },
        { label: 'HP Tourism Corporation', href: 'https://hptdc.in/' },
      ],
    },
  ];

  const [showAlert, setShowAlert] = useState(false);
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [alertError, setAlertError] = useState(false);

  useEffect(() => {
    if (showAlert) {
      // Fetch weather
      fetch(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=31.1048&lon=77.1734'
      )
        .then((res) => res.json())
        .then((data) => {
          const instant =
            data?.properties?.timeseries?.[0]?.data?.instant?.details;
          if (instant) {
            setWeather({
              air_temperature: instant.air_temperature,
              wind_speed: instant.wind_speed,
              humidity: instant.relative_humidity,
            });
          }
        })
        .catch((error) => {
          console.error('Weather API Error:', error);
          setWeather(null);
        });

      // Fetch disaster alerts from custom API
      fetch('/api/disaster')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setAlerts(data);
            setAlertError(false);
          } else {
            throw new Error();
          }
        })
        .catch(() => setAlertError(true));
    }
  }, [showAlert]);

  return (
    <footer className='relative bg-[#f5f5f5] text-[#2f4f4f] px-6 py-12 overflow-hidden'>
      <div className='absolute inset-0 opacity-10 z-0'>
        <img
          src='/images/paws-bg.png'
          alt='Snow leopard paw prints'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='relative z-10'>
        <div className='flex justify-center gap-5 mb-10'>
          <a
            href='https://www.facebook.com/himachaltourismofficial/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebookF className='text-[#4267B2] hover:text-blue-700 text-2xl' />
          </a>
          <a
            href='https://www.instagram.com/himachaltourismofficial/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram className='text-[#E1306C] hover:text-pink-600 text-2xl' />
          </a>
          <a
            href='https://www.youtube.com/channel/UCYGp33H-FBLiQ51YOTfDZww'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaYoutube className='text-[#FF0000] hover:text-red-600 text-2xl' />
          </a>
          <a
            href='https://x.com/hp_tourism'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaXTwitter className='text-[#1DA1F2] hover:text-sky-600 text-2xl' />
          </a>
        </div>

        <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
          {footerData.map((section, idx) => (
            <FooterColumn
              key={idx}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>

        <div className='mt-12 border-t pt-6 text-center text-sm text-gray-600 space-y-2'>
          <p>
            <strong>Tourist Helpline:</strong> +91-0177-2625924
          </p>
          <p>
            <strong>Nodal Officer:</strong> Smt. Harneet Kaur (ACP, Department
            of Tourism)
          </p>
          <p>
            For queries or suggestions, email us at{' '}
            <a
              href='mailto:tourism.hp@nic.in'
              className='underline text-blue-600 hover:text-blue-800'
            >
              tourism.hp@nic.in
            </a>
          </p>
          <p className='text-xs text-gray-400'>
            Last updated on: 07 April 2025
          </p>

          <div className='mt-4 flex justify-center items-center gap-3 text-gray-500'>
            <img
              src={logo}
              alt='Himachal Tourism Logo'
              className='w-16 h-16 object-contain rounded-full'
            />
            <span>
              Made with ❤️ in Himachal • © 2025 Department of Tourism & Civil
              Aviation
            </span>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <button
            onClick={() => setShowAlert(true)}
            className='bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200 animate-pulse'
          >
            🚨 Emergency Alerts
          </button>
        </div>

        {showAlert && (
          <div className='fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative border'>
              <button
                onClick={() => setShowAlert(false)}
                className='absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black'
              >
                ✖
              </button>
              <h2 className='text-xl font-bold mb-4 text-red-600 text-center'>
                🚨 Himachal Emergency Alerts
              </h2>
              <ul className='text-sm text-left list-disc list-inside space-y-2 text-gray-800'>
                {alertError ? (
                  <li className='text-red-500'>
                    ❌ Failed to load alerts. Try again later.
                  </li>
                ) : (
                  alerts.map((a, idx) => <li key={idx}>{a}</li>)
                )}
              </ul>
              <hr className='my-4' />
              {weather && (
                <div className='text-sm text-gray-800 text-left space-y-1'>
                  <h3 className='font-semibold mb-1'>
                    🌦️ Live Weather (Shimla)
                  </h3>
                  <p>
                    <strong>Temperature:</strong> {weather.air_temperature}°C
                  </p>
                  <p>
                    <strong>Wind Speed:</strong> {weather.wind_speed} m/s
                  </p>
                  <p>
                    <strong>Humidity:</strong> {weather.humidity}%
                  </p>
                </div>
              )}
              <p className='text-xs text-gray-400 mt-4 text-center'>
                Last updated: 07 April 2025
              </p>
            </div>
          </div>
        )}
      </div>
      <AiAssistant />
    </footer>
  );
}
