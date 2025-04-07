const Booking = require('../schema/bookingSchema');
const Room = require('../schema/Room');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const sendResponse = require('../utils/sendResponse');
const crypto = require('crypto');

// 1. User creates a booking
exports.createBooking = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { roomId } = req.params;

  const room = await Room.findById(roomId);
  if (!room) return next(new ErrorHandler('Room not found', 404));

  const code = crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. "A1B2C3"

  const booking = await Booking.create({
    user: userId,
    room: roomId,
    hotel: room.hotel,
    code,
    status: 'booked',
  });

  sendResponse(res, 201, true, 'Booking created successfully', booking);
});

// 2. User gets their bookings
exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('room')
    .sort('-createdAt');

  sendResponse(res, 200, true, 'Your bookings', bookings);
});

// 3. Hotel gets all bookings of their rooms
exports.getHotelBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ hotel: req.hotel._id })
    .populate('room user')
    .sort('-createdAt');

  sendResponse(res, 200, true, 'Hotel bookings fetched', bookings);
});

// 4. Hotel checks in guest
exports.checkInBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) return next(new ErrorHandler('Booking not found', 404));
  if (booking.hotel.toString() !== req.hotel._id.toString())
    return next(new ErrorHandler('Unauthorized', 403));
  if (booking.status !== 'booked')
    return next(
      new ErrorHandler('Cannot check-in. Status must be "booked".', 400)
    );

  booking.status = 'checked-in';
  await booking.save();

  sendResponse(res, 200, true, 'Guest checked-in successfully', booking);
});

// 5. Hotel checks out guest
exports.checkOutBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) return next(new ErrorHandler('Booking not found', 404));
  if (booking.hotel.toString() !== req.hotel._id.toString())
    return next(new ErrorHandler('Unauthorized', 403));
  if (booking.status !== 'checked-in')
    return next(
      new ErrorHandler('Cannot check-out. Status must be "checked-in".', 400)
    );

  booking.status = 'checked-out';
  await booking.save();

  sendResponse(res, 200, true, 'Guest checked-out successfully', booking);
});
