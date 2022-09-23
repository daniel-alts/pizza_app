const router = require('express ').Router();
const userController = require('../controllers/usersControllers');

router.route('/').get(userController);

module.exports = router;
