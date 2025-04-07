const Hotel = require('../models/Hotel');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const sendResponse = require('../utils/sendResponse');

exports.createHotel = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hotelExists = await Hotel.findOne({ email });
  if (hotelExists) return next(new ErrorHandler('Hotel already exists', 400));

  const hotel = await Hotel.create({ name, email, password });

  sendResponse(res, 201, true, 'Hotel created successfully', {
    _id: hotel._id,
    name: hotel.name,
    email: hotel.email,
  });
});

exports.loginHotel = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const hotel = await Hotel.findOne({ email });
  if (!hotel) return next(new ErrorHandler('Invalid credentials', 401));

  const isMatch = await hotel.matchPassword(password);
  if (!isMatch) return next(new ErrorHandler('Invalid credentials', 401));

  const token = hotel.generateToken();

  sendResponse(res, 200, true, 'Hotel logged in successfully', {
    _id: hotel._id,
    name: hotel.name,
    email: hotel.email,
    token,
  });
});

exports.getHotelProfile = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.hotel._id).select('-password');
  if (!hotel) return next(new ErrorHandler('Hotel not found', 404));

  sendResponse(res, 200, true, 'Hotel profile fetched', hotel);
});
