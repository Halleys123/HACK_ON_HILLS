const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const getMyHotels = catchAsync(async (req, res) => {
  const { user } = req;
  const { page = 1, limit = 10, select = 'hotelName id' } = req.query; // Extract pagination parameters

  console.log(`User ID: ${user.id}`);
  // Fetch hotels owned by the user with pagination
  const hotels = await HotelSchema.find({ ownerId: user.id })
    .select(select) // Select only hotelName and id
    .skip((page - 1) * limit) // Skip documents for pagination
    .limit(parseInt(limit)); // Limit the number of documents returned
  if (!hotels || hotels.length === 0) {
    return sendResponse(res, 404, false, 'No hotels found for this user', {});
  }

  sendResponse(res, 200, true, 'List of all hotels for the user', {
    hotels,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
    },
  });
});

module.exports = {
  getMyHotels,
};
