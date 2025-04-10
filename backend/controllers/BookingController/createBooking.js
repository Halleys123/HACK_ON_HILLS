const HotelSchema = require('../../schemas/HotelSchema');
const RoomSchema = require('../../schemas/RoomSchema');
const BookingSchema = require('../../schemas/BookingSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const startBookingExpirationTimer = (bookingId, roomIds) => {
  const FIFTEEN_MINUTES = 15 * 60 * 1000;
  setTimeout(async () => {
    try {
      const booking = await BookingSchema.findById(bookingId);
      if (booking && booking.status === 'pending') {
        booking.status = 'cancelled';
        await booking.save();
        await RoomSchema.updateMany(
          { _id: { $in: roomIds } },
          { isAvailable: true }
        );
        console.log(
          `Booking ${bookingId} expired after 15 minutes. Rooms are now available.`
        );
      }
    } catch (err) {
      console.error('Error expiring booking:', err);
    }
  }, FIFTEEN_MINUTES);
};

const createBooking = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  const {
    hotelIds,
    roomIds,
    adults,
    children,
    specialRequests = '',
    phone = '',
    email = '',
    checkOut,
    checkIn,
  } = req.body;

  if (!hotelIds || !roomIds || hotelIds.length === 0 || roomIds.length === 0) {
    return sendResponse(
      res,
      400,
      false,
      "We don't know in which Hotels or Rooms you want to stay",
      { hotelIds, roomIds }
    );
  }

  const hotels = await HotelSchema.find({ _id: { $in: hotelIds } });
  if (hotels.length !== hotelIds.length) {
    return sendResponse(res, 404, false, 'Some hotels do not exist', {});
  }

  const rooms = await RoomSchema.find({ _id: { $in: roomIds } });
  if (rooms.length !== roomIds.length) {
    return sendResponse(res, 404, false, 'Some rooms do not exist', {});
  }

  const unavailableRooms = rooms.filter((room) => !room.isAvailable);
  if (unavailableRooms.length > 0) {
    return sendResponse(
      res,
      409,
      false,
      'Some rooms are busy, Please try again later',
      { unavailableRooms }
    );
  }

  const booking = new BookingSchema({
    hotelIds,
    roomIds,
    userId,
    status: 'pending',
    checkInStatus: 'upcoming',
    specialRequests,
    guests: {
      adults: adults || 1,
      children: children || 0,
    },
    contact: {
      phone,
      email,
    },
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
  });

  let saveBooking;
  try {
    saveBooking = await booking.save();
    try {
      await RoomSchema.updateMany(
        { _id: { $in: roomIds } },
        { isAvailable: false }
      );
    } catch (error) {
      await BookingSchema.findByIdAndDelete(saveBooking._id);
      throw new Error(
        'Error updating room availability, booking has been rolled back'
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error saving booking');
  }

  startBookingExpirationTimer(saveBooking._id, roomIds);

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
