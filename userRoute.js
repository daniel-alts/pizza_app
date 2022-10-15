const express = require('express')
//const app = require('.')

const userController = require('./userController')
const auth = require('./authenticate')

const Router = express.Router()




//USER ROUTES

Router.post('/signup', auth.signup)

Router.post('/login', auth.login)

Router.get('/', userController.getAllUsers)

Router.post('/', userController.createUser)

Router.get('/:id', userController.getUser)

Router.patch('/:id', userController.updateUser)

Router.delete('/:id', userController.deleteUser)




module.exports = Router