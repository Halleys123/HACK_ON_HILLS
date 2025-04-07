const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController');

const { protectUser } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protectUser, getUserProfile);

module.exports = router;
