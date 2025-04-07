const UserSchema = require('../schema/User');
const catchAsync = require('../utils/catchAsync');
const sendresponse = require('../utils/sendResponse');

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
    return sendresponse(res, 400, false, 'User not created', {
      user: null,
    });
  }

  sendResponse(res, 201, true, 'User created successfully', {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = {
  registerUser,
};
