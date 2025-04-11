import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-between items-center mt-4'>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-600 hover:bg-blue-50'
        }`}
      >
        Previous
      </button>
      <span className='text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-600 hover:bg-blue-50'
        }`}
      >
        Next
      </button>
    </div>
  );
}
