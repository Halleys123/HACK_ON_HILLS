const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const createHotel = catchAsync(async (req, res) => {
  const { id: ownerId } = req.user;
  const {
    hotelName,
    description,
    address,
    state,
    city,
    country,
    zipCode,
    coordinates,
  } = req.body;

  const newHotel = new HotelSchema({
    ownerId,
    hotelName,
    description,
    address,
    state,
    city,
    country,
    zipCode,
    coordinates,
  });

  const hotelSave = await newHotel.save();

  if (!hotelSave) {
    return sendResponse(res, 500, false, 'Failed to create hotel', {});
  }

  sendResponse(
    res,
    200,
    true,
    `Hotel ${hotelName} was created successfully with id ${hotelSave._id}`,
    hotelSave
  );
});

module.exports = {
  createHotel,
};
