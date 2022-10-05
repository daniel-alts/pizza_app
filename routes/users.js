const express = require("express")
const moment = require('moment')
const userModel = require("../models/usersModel")

const usersRoute = express.Router()

usersRoute.get("/", async(req, res)=>{
        const users = await userModel.find()
    
        return res.json({ 
            status: true, 
            message: users 
        })
    })
    

// create new user


module.exports = usersRoute