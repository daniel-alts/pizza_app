const express = require('express')
const userController = require('../controller/user')
const passport = require('passport')
const router = express.Router()

 
router.post('/register', passport.authenticate('register', { session: false }), userController.createUser)


router.post('/login', userController.logIn)





module.exports = router