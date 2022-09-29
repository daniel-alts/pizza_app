const router = require('express').Router();
const userController = require('../controllers/usersControllers');
const auth = require('../controllers/auth');

router.route('/signup').post(auth.Register);

// router.route('/').get(userController);

module.exports = router;
