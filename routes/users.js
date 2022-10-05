const express = require('express')
const router = express.Router()
const controller = require('../controllers/usersController')
const authenticate = require('../middleware/authenticate')

router.route('/').get(authenticate, controller.getAllUsers)


router.route('/register').post(controller.createUser)

module.exports = router
