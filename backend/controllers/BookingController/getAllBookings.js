const BookingSchema = require('../../schemas/BookingSchema');
const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const getAllBookings = catchAsync(async (req, res, next) => {
  const { user } = req;
  let { page = 1, limit = 10, checkInStatus, hotelIds } = req.query; // Extract pagination and checkInStatus parameters

  // check if the user is an admin or a hotel owner
  const hotel = await HotelSchema.find({ ownerId: user.id });
  if (!hotel) {
    return sendResponse(
      res,
      403,
      false,
      'You are not authorized to view bookings for this hotel',
      {}
    );
  }
  const splitHotelIds = hotelIds.split(',');
  if (splitHotelIds.length > 1) {
    hotelIds = hotelIds ? hotelIds.split(',') : [hotel._id]; // Convert hotelIds to an array if provided
  }
  console.log(hotelIds);
  if (!hotelIds || hotelIds.length === 0) {
    // send all bookings for the hotel if no hotelIds are provided
    const hotels = await HotelSchema.find({ ownerId: user.id });
    hotelIds = hotels.map((hotel) => hotel._id); // Extract hotel IDs from the hotels array
  }

  // Build query object
  const query = {
    hotelIds: { $in: hotelIds }, // Filter by hotel IDs
  };
  if (checkInStatus) {
    if (checkInStatus !== 'all') query.checkInStatus = checkInStatus;
  }

  // Fetch all bookings for the hotel with pagination and optional checkInStatus filter
  const bookings = await BookingSchema.find(query)
    .populate('userId', ['name', 'email', 'phoneNumber'])
    .populate('roomIds', ['roomNumber'])
    .skip((page - 1) * limit) // Skip documents for pagination
    .limit(parseInt(limit)); // Limit the number of documents returned

  if (!bookings || bookings.length === 0) {
    return sendResponse(
      res,
      404,
      false,
      'No bookings found for this hotel',
      {}
    );
  }

  sendResponse(res, 200, true, 'List of all bookings for the hotel', {
    bookings,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
    },
  });
});

module.exports = {
  getAllBookings,
};
