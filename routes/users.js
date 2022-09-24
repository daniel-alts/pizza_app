const express = require('express')
const router = express.Router()
const {registerUser} = require('../controller/user')

router.route('/register').post(registerUser)

module.exports = router