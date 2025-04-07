const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  createBooking,
} = require('../controllers/BookingController/createBooking');
const { checkIn } = require('../controllers/BookingController/checkIn');
const router = express.Router();

router.post(
  '/book-room',
  authenticate,
  authorize(['owner', 'customer']),
  createBooking
);
router.put(
  '/check-in/:bookingId',
  authenticate,
  authorize(['owner', 'customer']),
  checkIn
);
router.put(
  '/check-out/:bookingId',
  authenticate,
  authorize(['owner', 'customer'])
);

module.exports = router;
