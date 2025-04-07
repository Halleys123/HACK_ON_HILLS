const connectDB = require('./utils/connectDB');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const cors = require('cors');
const helmet = require('helmet');
const sendResponse = require('./utils/sendResponse');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/hotel', hotelRoutes);
app.use('/api/v1/room', roomRoutes);
app.use('/api/v1/booking', bookingRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/v1', (req, res) => {
  res.send('Welcome to the Hotel Booking API!');
});

app.use((req, res, next) => {
  const error = new Error('Route not found, Please check for typos...');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || 'Internal Server Error';
  sendResponse(res, statusCode, false, message, null);
});

module.exports = app;
