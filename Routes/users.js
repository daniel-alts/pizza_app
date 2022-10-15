const express = require('express')
const passport = require('passport')
const router = express.Router()
const {registerUser} = require('../controller/user')

router.route('/signup').post(registerUser)

module.exports = router