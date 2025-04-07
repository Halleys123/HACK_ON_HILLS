const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/UserController/register.js');
const { loginUser } = require('../controllers/UserController/login.js');
const authenticate = require('../middlewares/authenticate.js');
const sendResponse = require('../utils/sendResponse.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/authenticate-test', authenticate, (req, res) => {
  sendResponse(res, 200, true, 'Authentication successful', { user: req.user });
});

module.exports = router;
