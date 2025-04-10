const HotelSchema = require('../../schemas/HotelSchema');
const RoomSchema = require('../../schemas/RoomSchema');
const BookingSchema = require('../../schemas/BookingSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const startBookingExpirationTimer = (bookingId, roomId) => {
  const FIFTEEN_MINUTES = 15 * 60 * 1000;
  setTimeout(async () => {
    try {
      const booking = await BookingSchema.findById(bookingId);
      if (booking && booking.status === 'pending') {
        booking.status = 'cancelled';
        await booking.save();
        await RoomSchema.findByIdAndUpdate(roomId, { isAvailable: true });
        console.log(
          `Booking ${bookingId} expired after 15 minutes. Room ${roomId} is now available.`
        );
      }
    } catch (err) {
      console.error('Error expiring booking:', err);
    }
  }, FIFTEEN_MINUTES);
};
const createBooking = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  const { hotelId, roomId, adults, children, specialRequests = '' } = req.body;

  if (!hotelId || !roomId) {
    return sendResponse(
      res,
      400,
      false,
      "We don't know in which Hotel or Room you want to stay",
      { hotelId, roomId }
    );
  }

  const hotel = await HotelSchema.findById(hotelId);
  if (!hotel) {
    return sendResponse(res, 404, false, 'There is no such hotel', {});
  }

  const room = await RoomSchema.findById(roomId);
  if (!room) {
    return sendResponse(res, 404, false, 'There is no such room available', {});
  }

  if (!room.isAvailable) {
    return sendResponse(
      res,
      409,
      false,
      'Room is busy, Please try again later',
      { room }
    );
  }

  const booking = new BookingSchema({
    hotelId,
    roomId,
    userId,
    status: 'pending',
    checkInStatus: 'upcoming',
    specialRequests,
    guests: {
      adults: adults || 1,
      children: children || 0,
    },
  });

  let saveBooking;
  try {
    saveBooking = await booking.save();
    try {
      await RoomSchema.findByIdAndUpdate(roomId, { isAvailable: false });
    } catch (error) {
      await BookingSchema.findByIdAndDelete(saveBooking._id);
      throw new Error(
        'Error updating room availability, booking has been rolled back'
      );
    }
  } catch (error) {
    throw new Error('Error saving booking');
  }

  startBookingExpirationTimer(saveBooking._id, roomId);

  return sendResponse(
    res,
    201,
    true,
    'You have 15 minutes to complete your payment, or the booking will be cancelled',
    { saveBooking }
  );
});

module.exports = {
  createBooking,
};
