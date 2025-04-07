const ErrorHandler = require('../utils/ErrorHandler');

exports.checkVerified = (req, res, next) => {
  if (!req.user?.isVerified) {
    return next(
      new ErrorHandler('Please verify your email before continuing', 401)
    );
  }
  next();
};
