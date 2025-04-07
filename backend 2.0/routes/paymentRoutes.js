const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { dummyPay } = require('../controllers/PaymentController/pay');
const router = express.Router();

router.post('/', authenticate, authorize(['owner', 'customer']), dummyPay);

module.exports = router;
