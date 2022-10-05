const router = require('express').Router();
const { isAuthenticatedforlogin, isAuthenticated } = require('../middleware/utils');
const user = require('../controllers/user');

router.get('/users', user.user)

router.post('/user/login', isAuthenticatedforlogin, user.login);

router.post('/user/signup', user.signup);

module.exports = router;