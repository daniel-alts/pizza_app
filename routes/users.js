const express = require('express')
const router = express.Router()
const controller = require('../controllers/usersController')
const getToken = require('../middleware/getToken')
const getUser = require('../middleware/getUser')
const authorize = require('../middleware/authorize')

/**
 * Get all users
 */
router.route('/').get(getToken, getUser, authorize, controller.getAllUsers)

/**
 * Create a new user
 */
router.route('/register').post(controller.createUser)

module.exports = router
