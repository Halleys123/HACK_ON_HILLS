const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const deleteAllHotel = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  await HotelSchema.deleteMany({ ownerId: userId }); // Deletes all hotels with ownerId matching userId
  sendResponse(res, 200, true, 'All hotels deleted successfully', {});
});

const deleteHotel = catchAsync(async (req, res, next) => {
  const { id: ownerId } = req.user;
  const { id: hotelId } = req.params; // Extract the hotel ID from the request parameters

  const deletedHotel = await HotelSchema.findOneAndDelete({
    _id: hotelId,
    ownerId,
  }); // Deletes the hotel by ID and ownerId

  if (!deletedHotel) {
    return sendResponse(
      res,
      404,
      false,
      'Hotel not found or you do not have permission to delete it',
      {}
    );
  }

  sendResponse(res, 200, true, 'Hotel deleted successfully', { deletedHotel });
});

module.exports = {
  deleteAllHotel,
  deleteHotel,
};
