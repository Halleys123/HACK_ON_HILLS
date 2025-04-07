const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/UserController/register.js');
const { loginUser } = require('../controllers/UserController/login.js');

router.post('/register', (req, res) => {
  res.send('User registered successfully!');
});
router.post('/login', loginUser);

module.exports = router;
