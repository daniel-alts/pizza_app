const userRouter = require("express").Router();
const UserController = require('../controllers/userController')
const authenticateUser = require('../middleware/auth')
userRouter
.post('/register', UserController.register)
.post('/login', UserController.login)
.get('/getAllUsers',UserController.getAllUsers)
.get('/getUserbyId/:id', UserController.getUserbyId)
.put('/updateUser/:id', UserController.updateUser)
.delete('/deleteUser/:id', UserController.deleteUser)


module.exports = userRouter