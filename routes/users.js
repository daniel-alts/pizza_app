const express = require('express')
const router = express.Router()
const controller = require('../controllers/usersController')
const authenticate = require('../middleware/authenticate')

/**
 * Get all users
 */
router.route('/').get(authenticate, controller.getAllUsers)

/**
 * Create a new user
 */
router.route('/register').post(controller.createUser)

module.exports = router
