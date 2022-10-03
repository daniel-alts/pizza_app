const { Router } = require('express');

const router = Router();
const { basicAuthentication } = require('../config/auth');
router.use('/user', require('./user.routes'));
router.use('/order', basicAuthentication, require('./order.routes'));

module.exports = router;
