
const express = require("express");
const mongoose = require("mongoose");


const orderModel = require("./order/orderModel")
const userModel = require("./user/userModel");

 async function  authenticate(req, res, next) {
    const userName = req.headers.username;
    const password = req.headers.password;
    const user = await userModel.findOne({password: password, userName: userName});
    if(!user) {
        return res.status(404).json({status: false, error: "incorrect username or password"});
    }
    next();
}


module.exports = {authenticate};