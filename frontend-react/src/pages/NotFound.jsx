import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4'>
      <div className='text-center relative'>
        {/* Animated floating circles */}
        <div className='absolute -top-32 -left-32 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob'></div>
        <div className='absolute top-0 -right-32 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-32 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000'></div>

        {/* Main content */}
        <div className='relative space-y-6'>
          <h1 className='text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient'>
            404
          </h1>

          <h2 className='text-4xl font-semibold text-gray-800'>
            Page Not Found
          </h2>

          <p className='text-gray-600 text-lg max-w-md'>
            Oops! The page you're looking for has vanished into the digital
            void.
          </p>

          <div className='pt-6'>
            <Link
              to='/'
              className='inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-500'
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Add keyframe animations in CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        @keyframes blob {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
        .animate-blob {
          animation: blob 12s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
