const express = require('express');
const {
  createRoom,
  getHotelRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require('../controller/roomController');
const { protectHotel } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protectHotel);
router.post('/', createRoom);
router.get('/', getHotelRooms);
router.get('/:id', getRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
