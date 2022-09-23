const express = require('express');
const userRouter = express.Router()
const USERS = require("../model/userModel");


userRouter.post('/', async (req, res) => {
    const {userName,Password,userType} = req.body
    if(!(userName||Password)) return res.status(400).send({message: "User names and passwords are required"})
    try {
        const Allusers = await USERS.find()
        const User = Allusers.find((user) => user.UserName === userName);
        // checking if user already exsis in the databases
        if (User) return res.status(409).send('User Already Exist. Please Login');
        const newUser = await USERS.create({
                UserName:userName,
                Password:Password,
                User_Type:userType
        })
        res.status(201).send({Data:newUser})
    } catch (error) {
        console.log(error.message);
        res.status(409).send(error.message)
    }
})



module.exports = userRouter