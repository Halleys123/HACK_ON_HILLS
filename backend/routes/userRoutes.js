const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/UserController/register.js');
const { loginUser } = require('../controllers/UserController/login.js');
const { getMyHotels } = require('../controllers/UserController/getMyHotels.js');
const authenticate = require('../middlewares/authenticate.js');
const sendResponse = require('../utils/sendResponse.js');
const authorize = require('../middlewares/authorize.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/isLoggedIn', authenticate, (req, res) => {
  sendResponse(res, 200, true, 'Authentication successful', { user: req.user });
});
router.get('/getMyHotels', authenticate, authorize(['owner']), getMyHotels);

module.exports = router;
