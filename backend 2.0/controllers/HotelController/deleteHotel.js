const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const deleteAllHotel = catchAsync(async (req, res, next) => {
  sendResponse(res, 200, true, 'Delete all', {});
});
const deleteHotel = catchAsync(async (req, res, next) => {
  sendResponse(res, 200, true, 'Delete one by id', {});
});

module.exports = {
  deleteAllHotel,
  deleteHotel,
};
