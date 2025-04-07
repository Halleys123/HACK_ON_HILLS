const UserSchema = require('../../schemas/UserSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = new UserSchema({
    email,
    password,
    name,
    role,
  });
  const user = await newUser.save();

  if (!user) {
    return sendResponse(res, 400, false, 'User not created', {
      user: null,
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });

  sendResponse(res, 201, true, 'User created successfully', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

module.exports = {
  registerUser,
};
