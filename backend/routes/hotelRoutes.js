const express = require('express');
const {
  createHotel,
  loginHotel,
  getHotelProfile,
} = require('../controllers/hotelController');
const { protectHotel } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', createHotel);
router.post('/login', loginHotel);
router.get('/profile', protectHotel, getHotelProfile);

module.exports = router;
