const express = require('express');
const router = express.Router();

const {
  addRoom,
  addMultipleRooms,
} = require('../controllers/RoomController/addRoom');
const {
  deleteRoom,
  deleteMultipleRooms,
} = require('../controllers/RoomController/deleteRoom');

const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { getRooms } = require('../controllers/RoomController/getRooms');

router.get('', getRooms);
router.post('/add-room', authenticate, authorize(['owner']), addRoom);
router.post(
  '/add-multiple-room',
  authenticate,
  authorize(['owner']),
  addMultipleRooms
);
router.delete(
  '/delete-room/:roomId',
  authenticate,
  authorize(['owner']),
  deleteRoom
);
router.delete(
  '/delete-multiple-rooms',
  authenticate,
  authorize(['owner']),
  deleteMultipleRooms
);
module.exports = router;
