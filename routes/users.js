const express = require('express')
const passport = require('passport')
const router = express.Router()
const {registerUser,loginUser} = require('../controller/user')

router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router