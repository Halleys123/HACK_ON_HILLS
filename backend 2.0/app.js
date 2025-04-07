const connectDB = require('./utils/connectDB');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');

const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.route('/api/v1/user', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/v1', (req, res) => {
  res.send('Welcome to the Hotel Booking API!');
});

module.exports = app;
