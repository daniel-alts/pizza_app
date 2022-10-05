const express = require("express");
const moment = require("moment");
const userModel = require("../Models/userModel")
// const {authUser}= require("../middleware/auth")


const userRouter = express.Router()



// CRUD routes

userRouter.get('/', async (req, res) => {
    const users = await userModel.find()
    return res.status(200).json({ status: 'Success', data : {users} })
})


userRouter.post('/', async (req, res) => {
    const body = req.body;

    const user = await userModel.create(body)
    
    return res.json({ status: true, user })
})

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id)

    if (!user) {
        return res.status(404).json({ status: false, user: null })
    }

    return res.status(200).json({ status: true, user })
})

userRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findByIdAndUpdate(id, req.body)

    if (!user) {
        return res.status(404).json({ status: false, user: null })
    }

    return res.status(201).json({ status: true, user })
})

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await userModel.deleteOne({ _id: id})

    return res.status(204).json({ status: true, user })
})

module.exports = userRouter