const router = require('express').Router();
const auth = require('../controllers/auth');

router.route('/login').post(auth.Login);

module.exports = router;
