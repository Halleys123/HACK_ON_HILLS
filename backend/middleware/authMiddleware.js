const jwt = require('jsonwebtoken');
const User = require('../schema/User');
const Hotel = require('../schema/Hotel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsync = require('../utils/catchAsync');

const verifyToken = (token) => {
  // eslint-disable-next-line no-undef
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware for Users
exports.protectUser = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer'))
    return next(new ErrorHandler('User not authenticated', 401));

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  const user = await User.findById(decoded.id);
  if (!user) return next(new ErrorHandler('User not found', 404));

  req.user = user;
  next();
});

// Middleware for Hotels
exports.protectHotel = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer'))
    return next(new ErrorHandler('Hotel not authenticated', 401));

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  const hotel = await Hotel.findById(decoded.id);
  if (!hotel) return next(new ErrorHandler('Hotel not found', 404));

  req.hotel = hotel;
  next();
});
