const express = require('express');
const router = express.Router();

const { createHotel } = require('../controllers/HotelController/createHotel');
const {
  deleteAllHotel,
  deleteHotel,
} = require('../controllers/HotelController/deleteHotel');

const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/authenticate');

router.post('/create-hotel', authenticate, authorize(['owner']), createHotel);
router.delete('/:id', authenticate, authorize(['owner']), deleteAllHotel);
router.delete('/', authenticate, authorize(['owner']), deleteHotel);

module.exports = router;
