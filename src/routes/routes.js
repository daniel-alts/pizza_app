const { Router } = require('express');

const router = Router();
const { basicAuthentication } = require('../config/auth');

router.use('/order', basicAuthentication, require('./order.routes'));
router.use('/user', require('./user.routes'));

module.exports = router;
