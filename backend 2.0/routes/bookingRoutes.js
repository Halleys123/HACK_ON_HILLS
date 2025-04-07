const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const {
  createBooking,
} = require('../controllers/BookingController/createBooking');
const router = express.Router();

router.post(
  '/book-room',
  authenticate,
  authorize(['owner', 'customer']),
  createBooking
);

module.exports = router;
