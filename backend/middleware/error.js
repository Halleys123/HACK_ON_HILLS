const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    console.error('🧨 Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
