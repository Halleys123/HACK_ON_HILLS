const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const sendResponse = require('../utils/sendResponse');

// Generate JWT token
const generateToken = (id) => {
  // eslint-disable-next-line no-undef
  return jwt.sign({ id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new ErrorHandler('Please provide name, email, and password', 400)
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler('User already exists', 400));
  }

  const user = await User.create({ name, email, password });

  return sendResponse(res, 201, true, 'User registered successfully', {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please provide email and password', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }
  return sendResponse(res, 200, true, 'User logged in successfully', {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (User only)
exports.getUserProfile = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler('User not authenticated', 401));
  }

  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  return sendResponse(res, 200, true, 'User profile retrieved successfully', {
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});
