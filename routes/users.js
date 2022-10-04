const express = require("express")
const moment = require('moment');
const userModel = require('../userModel');

const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
    const body = req.body;
    // res.send(body)

    const user = await userModel.create(body)
    
    return res.json({ status: true, user })
})

userRoute.post('/login', async (req, res) => {
    const body = req.body;

    const user = await userModel.findOne(body)

    if(!user) {
        return res.status(404).json({message: "Enter Username and Password"})
    }

    res.send(user)
})


module.exports = userRoute