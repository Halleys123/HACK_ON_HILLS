const UserSchema = require('../../schemas/UserSchema');
const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return sendResponse(res, 401, false, 'Invalid credentials', {
      user: null,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return sendResponse(res, 401, false, 'Invalid credentials', {
      user: null,
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  sendResponse(res, 200, true, 'User logged in successfully', {
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
  loginUser,
};
