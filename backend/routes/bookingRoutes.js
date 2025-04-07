const express = require('express');
const {
  createBooking,
  getMyBookings,
  getHotelBookings,
  checkInBooking,
  checkOutBooking,
} = require('../controller/bookingController');

const { protectUser, protectHotel } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:roomId', protectUser, createBooking);
router.get('/my', protectUser, getMyBookings);
router.get('/hotel', protectHotel, getHotelBookings);
router.post('/:id/checkin', protectHotel, checkInBooking);
router.post('/:id/checkout', protectHotel, checkOutBooking);

module.exports = router;

// Add checkInDate, checkOutDate, price, and other fields to Booking

// Validate that a room isn't double-booked on overlapping dates

// Booking cancellation (status: cancelled)

// Auto-expire unpaid/unconfirmed bookings (cron job)

// Global 404 route and error handler middleware,

// Rate limiting / request throttling for public APIs
