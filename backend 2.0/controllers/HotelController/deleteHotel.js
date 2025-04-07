const HotelSchema = require('../../schemas/HotelSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const deleteAllHotel = catchAsync(async (req, res, next) => {});
const deleteHotel = catchAsync(async (req, res, next) => {});

module.export = {
  deleteAllHotel,
  deleteHotel,
};
