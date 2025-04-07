const Room = require('../schema/roomSchema');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const sendResponse = require('../utils/sendResponse');

// Create a room
exports.createRoom = catchAsync(async (req, res, next) => {
  const hotelId = req.hotel._id;
  const room = await Room.create({ ...req.body, hotel: hotelId });

  sendResponse(res, 201, true, 'Room created successfully', room);
});

// Get all rooms of the current hotel
exports.getHotelRooms = catchAsync(async (req, res, next) => {
  const hotelId = req.hotel._id;
  const rooms = await Room.find({ hotel: hotelId });

  sendResponse(res, 200, true, 'Rooms fetched successfully', rooms);
});

// Get single room by ID
exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) return next(new ErrorHandler('Room not found', 404));

  sendResponse(res, 200, true, 'Room fetched', room);
});

// Update room
exports.updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!room) return next(new ErrorHandler('Room not found', 404));

  sendResponse(res, 200, true, 'Room updated successfully', room);
});

// Delete room
exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) return next(new ErrorHandler('Room not found', 404));

  sendResponse(res, 200, true, 'Room deleted successfully', room);
});
