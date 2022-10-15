const express = require('express')
const mongoose = require('mongoose');
const userModel = require('../model/userModel')

async function authenticateUser (req,res,next){
    const id = req.body.user_id
    const userId = await userModel.findById(id);

        if (id == null) {
        res.status(400);
        return res.send("You need to sign in, add your user_id");
    } else if (userId.user_type !== "admin") {
        res.status(401);
        return res.send("You are not authorized");
    }
    next();
}

module.exports = authenticateUser;


