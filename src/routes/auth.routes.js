const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const passport = require('passport');
const router = Router();

router.post(
  '/create',
  passport.authenticate('signup', { session: false }),
  registerUser
);

router.post('/login', loginUser);

module.exports = router;
