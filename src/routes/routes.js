const { Router } = require('express');

const router = Router();
const { basicAuthentication } = require('../config/auth');
const passport = require('passport');

router.use(
  '/order',
  passport.authenticate('jwt', { session: false }),
  require('./order.routes')
);
router.use('/user', require('./auth.routes'));

module.exports = router;
