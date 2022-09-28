const router = require('express').Router()
const { registerUser } = require('./controllers')

router.post('/register', registerUser)

module.exports = router