const express = require('express')
const router = express.Router()
const controller = require('../controllers/usersController')
const passport = require('passport')
const authorize = require('../middleware/authorize')

/**
 * Get all users
 */
router.route('/').get(passport.authenticate('jwt', { session: false }), authorize, controller.getAllUsers)

/**
 * Create a new user
 */
router.route('/register').post(passport.authenticate('register', { session: false }), controller.createUser)

module.exports = router
