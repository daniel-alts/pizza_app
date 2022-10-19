const express = require("express");
const userModel = require("../models/userModel")


const userRoute = express.Router();

userRoute.get("/", (req, res)=>{
    res.status(200).json({status: true, message: "we are here"})
})

userRoute.post("/register", async (req, res)=>{
    const body = req.body;
    const user = await userModel.create({
        firstName: body.firstName,
        lastName: body.lastName,
        date_Of_Birth: body.date_Of_Birth,
        userName: body.userName,
        password: body.password,
        userType: body.userType
    });
    res.status(200).json({status: true, user})
})

userRoute.get("/login", async (req, res)=>{
    const userName = req.headers.username;
    const password = req.headers.password;
    const user = await userModel.findOne({password: password, userName: userName});
    if(!user) {
        return res.status(404).json({status: false, error: "incorrect username or password"});
    }
    
    res.status(200).json({status: true, message: "You are now logged in"})
})






module.exports = userRoute;