const app = require('./app');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-undef
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  // eslint-disable-next-line no-undef
  process.exit(1);
});

// eslint-disable-next-line no-undef
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err);
  // eslint-disable-next-line no-undef
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
