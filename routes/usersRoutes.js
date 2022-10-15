const router = require('express').Router();
const userController = require('../controllers/usersControllers');
const auth = require('../controllers/auth');

router.route('/signup').post(auth.Register);

router.route('/login').post(auth.Login);

router
	.route('/:id')
	.delete(userController.deleteUser)
	.patch(userController.updateUser);

module.exports = router;
