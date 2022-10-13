const express = require('express')
const userController = require('../controller/user.controller')

const userRouter = express.Router()


userRouter.get('/', userController.getAllUsers)

userRouter.get('/:id', boookController.getBookByID)

userRouter.post('/',userController.createUser)


bookRouter.delete('/:id', userController.deleteUser)


//get all user
userRouter.get('/', async(req,res) =>{
    const users = await userModel.find()

    return res.json({ status: true, users })
})


//create user
userRouter.post('/', async (req, res) => {
    const body = req.body
    const emailExists = await userModel.find({ email: `${body.email}` });

    if (emailExists != null){
        return res.status(409).json({ status: false, message: "User already exists" })
    }
        
    const user = await userModel.create({ 
        username: body.username,
        password: body.password,
        email: body.email,
        userType: body.userType
    })

    return res.status(201).json({ status: true, user })
})

//delete user
userRouter.delete('/:id', async (req,res) =>{
    const {id} =  req.params

    const user = await userModel.deleteOne({_id: id})

    return res.json({status: true, user})
})



module.exports = userRouter