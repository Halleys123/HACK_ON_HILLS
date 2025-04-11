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

const {
  addPrimaryImage,
} = require('../controllers/HotelController/addPrimaryImage');

const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/', // Temporary storage location
});

router.get('/', getAllHotels);
router.get('/:hotelId', getHotel); // Assuming you want to get a specific hotel by ID
router.post('/', authenticate, authorize(['owner']), createHotel);
router.post(
  '/:hotelId/add-primary-image',
  authenticate,
  authorize(['owner']),
  upload.single('image'), // Add multer middleware to handle single file upload
  addPrimaryImage
);
router.delete('/:id', authenticate, authorize(['owner']), deleteAllHotel);
router.delete('/', authenticate, authorize(['owner']), deleteHotel);

module.exports = router;
