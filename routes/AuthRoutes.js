const express = require('express');
const passport = require('passport');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
