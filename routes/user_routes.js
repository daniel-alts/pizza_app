const { registerUser, loginUser } = require('../controllers/user_controllers')
const express = require('express')
const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

module.exports = router