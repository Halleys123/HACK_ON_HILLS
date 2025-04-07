const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const connectDB = require('./utils/connectDB');
const swaggerDocument = YAML.load('./swagger.yaml');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the Hotel Booking API!');
});

module.exports = app;
