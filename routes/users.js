const usersModel = require('../models/usersModel');
const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const connectDB = require('../database');
const { auth } = require('../auth');
require('dotenv').config();

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

const usersRouter = express.Router();


//create a new user
usersRouter.post('/', (req, res) => {
    const userData = req.body
    usersModel.create(userData).then((userData) => {
        res.status(201).send({
            message: "User profile successfully created",
            user: userData.username
        })
    }).catch(err => {
        console.log({error_message: err})
    })
    
})


//Admin authentication
usersRouter.use(async (req, res, next) => {  
    const user = await auth(req, res)
    if(user === "admin"){
        next()
    }
    else {
        res.status(401).send("Unathorized")
    }
    
})

//get all Users
usersRouter.get('/', (req, res) => {
    
    usersModel.find({}).then((users) => {
        res.status(200).send(users)
    }).catch(err => {
        console.log({error_message: err})
    })
})

//delete user by ID
usersRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    usersModel.findByIdAndDelete(id).then(() => {
        res.status(200).send(`User profile with id: ${id} has been deleted`)
    }).catch(err => {
        console.log(error)
    })
})


connectDB(PORT, DB_URL);

module.exports = usersRouter

