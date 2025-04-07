const jwt = require('jsonwebtoken');
const User = require('../schemas/UserSchema'); // Import User model

const authorize = (acceptedRoles) => async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
    req.user = decoded; // Attach decoded user info to request object

    // Fetch user from database using decoded user ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user's role is in the acceptedRoles array
    if (acceptedRoles && !acceptedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied. Insufficient permissions.',
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

module.exports = authorize;
