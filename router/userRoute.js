const express = require('express')
const userModel = require('../models/userModel')

const userRouter = express.Router()


userRouter.get('/', async (req,res) => {
    
    const allUsers = await userModel.find({})
    res.status(200).json({
        message: 'Here are the users',
        data: allUsers
    })
})

userRouter.post('/', async (req,res) => {
    const body = req.body
    const user = await userModel.create(body)
    res.status(201).json(user)
})

userRouter.patch('/:id', async (req,res) => {

})


module.exports = userRouter