const jwt = require('jsonwebtoken');
const UserSchema = require('../schemas/UserSchema');
const sendResponse = require('../utils/sendResponse');

async function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserSchema.findById(decoded.id).select(
      '-password -__v -createdAt -updatedAt'
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    sendResponse(res, 400, false, 'Invalid token.', {
      user: null,
    });
  }
}

module.exports = authenticate;
