const userModel = require("../models/userModel");

async function signup(req, res) {
    let userDetail = req.body
    let {userName} = userDetail
    const user = await userModel.exists({userName})
    if (!user) {
        const countUsers = await userModel.count({})
        if (countUsers == 0) userDetail._id = 1
        else userDetail._id = countUsers + 1
        const createUser = await userModel.create(userDetail)
        return res.json( {status: true, message: "successfully signed up, Login to place your orders"})
    }
    res.json( {status: false, message: "user already exists"})
}

async function login(req, res) {
    let userDetail = req.headers.authentication.split(" ")
    let [ ,userName, password ] = userDetail
    const user = await userModel.exists({userName, password})
    if (user) {
        res.json( {status: true, message: "successfully logged in, Kindly visit the orders page to place your orders"})
        return
    }
    res.json( {status: false, message: "login details incorrect"})
}

module.exports = {
    signup,
    login
}