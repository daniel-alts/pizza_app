const express = require("express")
const moment = require('moment')
const userModel = require("../models/usersModel")

const usersRoute = express.Router()

usersRoute.get("/users", (req, res)=>{
    res.status(200).json({status: true, message: " users route working"})
})


module.exports = usersRoute