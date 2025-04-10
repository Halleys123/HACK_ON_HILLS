const express = require('express');
const router = express.Router();

const { createHotel } = require('../controllers/HotelController/createHotel');
const {
  deleteAllHotel,
  deleteHotel,
} = require('../controllers/HotelController/deleteHotel');

const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/authenticate');
const {
  getAllHotels,
  getHotel,
} = require('../controllers/HotelController/getHotels');

router.get('/', getAllHotels);
router.get('/:hotelId', getHotel); // Assuming you want to get a specific hotel by ID
router.post('/', authenticate, authorize(['owner']), createHotel);
router.delete('/:id', authenticate, authorize(['owner']), deleteAllHotel);
router.delete('/', authenticate, authorize(['owner']), deleteHotel);

module.exports = router;
