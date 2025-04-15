const BookingSchema = require('../../schemas/BookingSchema');
const HotelSchema = require('../../schemas/HotelSchema');
const RoomSchema = require('../../schemas/RoomSchema');

const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const checkOut = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  const { bookingId } = req.params; // Extract the booking ID from the request parameters

  // Check if the user is an admin or a hotel owner
  const hotel = await HotelSchema.findOne({ ownerId: userId });
  if (!hotel) {
    return sendResponse(
      res,
      403,
      false,
      'You are not authorized to check out guests',
      {}
    );
  }

  // Find the booking by ID
  const booking = await BookingSchema.findById(bookingId);
  if (!booking) {
    return sendResponse(res, 404, false, 'Booking not found', {});
  }

  if (booking.status == 'completed') {
    return sendResponse(
      res,
      400,
      false,
      'This booking session has already been completed',
      {
        description: 'This booking session has already been completed',
        booking,
        hotel,
      }
    );
  }
  if (booking.status == 'cancelled') {
    return sendResponse(res, 400, false, 'Booking already cancelled', {
      description: 'Booking already cancelled',
      booking,
      hotel,
    });
  }

  // Check if the booking is already checked out
  if (booking.actualCheckOut !== null) {
    return sendResponse(res, 400, false, 'Guest is already checked out', {});
  }

  // Update the booking status to checkedOut
  await BookingSchema.findByIdAndUpdate(bookingId, {
    actualCheckOut: new Date(),
    checkInStatus: 'checked-out',
  });
  await RoomSchema.findByIdAndUpdate(booking.roomIds, {
    isAvailable: true,
  });
  sendResponse(res, 200, true, 'Guest checked out successfully', {
    booking,
    hotel,
  });
});

module.exports = {
  checkOut,
};
