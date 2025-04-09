import { useState } from 'react';
import hotelImg from './assets/hotel1.jpg';
import room1 from './assets/room1.jpg';
import room2 from './assets/room2.jpg';
import room3 from './assets/room3.jpg';
import room4 from './assets/room4.jpg';
import qr from './assets/qr.png';

function App() {
  const [showCards, setShowCards] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);

  const roomData = [
    {
      title: 'Deluxe Room',
      price: '₹2,999/night',
      desc: 'Perfect for couples with a view of the valley.',
      image: room1,
    },
    {
      title: 'Family Suite',
      price: '₹4,999/night',
      desc: 'Spacious rooms with attached balcony.',
      image: room2,
    },
    {
      title: 'Luxury Villa',
      price: '₹8,499/night',
      desc: 'Private villa with modern amenities.',
      image: room3,
    },
    {
      title: 'Budget Room',
      price: '₹1,499/night',
      desc: 'Affordable and comfortable stay.',
      image: room4,
    },
  ];

  const handleFlip = (index) => {
    setFlippedCard((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      <img
        src={hotelImg}
        alt="Hotel"
        className={`w-full h-full object-cover transition duration-400 ease-in-out ${showCards ? 'blur-sm' : ''}`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      <div className="absolute top-[15%] w-full text-center text-white z-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Tranquil Trails Inn</h1>
        <div className="h-8 overflow-hidden relative w-full">
          <div className="flex flex-col animate-[verticalScroll_20s_linear_infinite]">
            <span className="h-8 leading-8 text-lg text-white whitespace-nowrap mb-2">
              Located in the heart of Himachal Pradesh, Tranquil Trails Inn offers a serene getaway nestled between lush pine forests and mountain views.
            </span>
            <span className="h-8 leading-8 text-lg text-white whitespace-nowrap mb-2">
              Book your peaceful escape today and enjoy world-class service.
            </span>
            <span className="h-8 leading-8 text-lg text-white whitespace-nowrap mb-2">
              Experience nature, luxury, and comfort combined in one.
            </span>
            <span className="h-8 leading-8 text-lg text-white whitespace-nowrap mb-2">
              Just minutes away from scenic treks and local markets.
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center z-20 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-wrap gap-4 hover:-translate-y-1 hover:shadow-xl transition-all">
          {['Check-in', 'Check-out', 'Guests', 'Rooms'].map((label, idx) => (
            <div key={label} className="flex flex-col">
              <label className="text-sm font-semibold mb-1">{label}</label>
              <input
                type={idx < 2 ? 'date' : 'number'}
                defaultValue={idx >= 2 ? idx === 2 ? '2' : '1' : undefined}
                min="1"
                className="px-3 py-2 rounded-lg border border-gray-300 text-base w-40"
              />
            </div>
          ))}
          <div className="flex items-end">
            <button
              className="bg-black text-white px-5 py-2 rounded-lg text-base hover:bg-gray-900"
              onClick={() => setShowCards(true)}
            >
              Search →
            </button>
          </div>
        </div>
      </div>

      {showCards && (
        <div className="absolute top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] p-8 max-w-[95vw] rounded-xl bg-black/30 backdrop-blur flex flex-col items-center">
          <button
            className="absolute top-3 right-3 bg-black text-white text-xl rounded-full w-9 h-9 flex items-center justify-center z-[1001]"
            onClick={() => setShowCards(false)}
          >✖</button>
          <div className="flex flex-row gap-6 overflow-x-auto justify-center p-4 max-w-full scrollbar-hide">
            {roomData.map((room, idx) => (
              <div
                key={idx}
                className={`w-60 h-90 perspective-[1000px] shrink-0 rounded-xl relative overflow-hidden animate-fadeInUp`}
              >
                <div
                  className={`w-full h-full relative transition-transform duration-800 ease-in-out transform-style-preserve-3d ${flippedCard === idx ? 'rotate-y-180' : ''}`}
                >
                  <div className="absolute w-full h-full backface-hidden bg-white flex flex-col rounded-xl overflow-hidden">
                    <img src={room.image} alt={room.title} className="w-full h-36 object-cover" />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg mb-2">{room.title}</h3>
                      <p className="text-sm mb-2">{room.desc}</p>
                      <span className="font-bold text-gray-800 mb-3">{room.price}</span>
                      <button
                        className="mt-auto bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                        onClick={() => handleFlip(idx)}
                      >Book Now</button>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black bg-opacity-90 flex flex-col justify-center items-center p-4 text-white text-center rounded-xl">
                    <img src={qr} alt="QR Code" className="w-36 h-36 object-contain mb-4" />
                    <button
                      className="bg-white text-black px-4 py-2 rounded-md text-sm hover:bg-gray-200"
                      onClick={() => handleFlip(idx)}
                    >Back</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// Add this to your Tailwind config for custom animation
// theme: {
//   extend: {
//     animation: {
//       verticalScroll: 'verticalScroll 20s linear infinite',
//       fadeInUp: 'fadeInUp 0.6s ease',
//     },
//     keyframes: {
//       verticalScroll: {
//         '0%': { transform: 'translateY(0)' },
//         '25%': { transform: 'translateY(-2.5rem)' },
//         '50%': { transform: 'translateY(-5rem)' },
//         '75%': { transform: 'translateY(-7.5rem)' },
//         '100%': { transform: 'translateY(0)' },
//       },
//       fadeInUp: {
//         '0%': { opacity: 0, transform: 'translateY(20px)' },
//         '100%': { opacity: 1, transform: 'translateY(0)' },
//       },
//     },
//   },
// },
// plugins: [require('tailwind-scrollbar-hide')],
