const router = require('express').Router();
const auth = require('../controllers/auth');

router.route('/register').post(auth.Register);

router.route('/login').post(auth.Login);

module.exports = router;
