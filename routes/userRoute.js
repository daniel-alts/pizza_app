const express = require('express')
const { reset } = require('nodemon')
const User = require('../models/userModel')
const Users = require('../models/userModel')

const userRouter = express.Router()

// create user
userRouter.post('/', async (req,res) => {
    const {username, password, user_type} = req.body;
    if(!(username || password)) {
        return res.status(400).send({ message: "username and password required"})
    }

    try{
        const findUser = await Users.find()
        const userFound = findUser.find((user) => user.username === username);

        if (userFound) {
            return res.status(409).send('User already exists');
        }

        const newUser = await Users.create ({
            username : username,
            password: password,
            user_type: user_type
        })

        res.status(201).send({Data: newUser})

    } catch (error) {
        res.status(409).send(error.message);
    }
})

// Get all users
userRouter.get("/users", async (req, res) => {

    const users = await Users.find();

    if (!users) {
        return res.status(500).json({ status: false, users: null})
    }

    return res.json({ status: true, users })
    
})


module.exports = userRouter