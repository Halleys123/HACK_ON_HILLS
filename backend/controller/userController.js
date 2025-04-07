const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT
const generateToken = (id) => {
  // eslint-disable-next-line no-undef
  return jwt.sign({ id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user's profile
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user);
};
