const { userModel } = require('../models/userModel')

async function signup(req, res) {
    let userDetail = req.body
    let {email} = userDetail
    const user = await userModel.exists({email})
    if (!user) {
        const countUsers = await userModel.count({})
        if (countUsers == 0) userDetail._id = 1
        else userDetail._id = countUsers + 1
        const createUser = await userModel.create(userDetail)
        res.json( {status: true, message: "Signup successful, Login to make your orders"})
        return
    }
    res.json( {status: false, message: "user already exists"})
}

async function login(req, res) {
    let userDetail = req.headers.authentication.split(" ")
    let [ ,username, password, email] = userDetail
    const user = await userModel.exists({username, password, email})
    if (user) {
        res.json( {status: true, message: "Login successful, Visit the order routes to make your orders"})
        return
    }
    res.json( {status: false, message: "login details incorrect"})
}

module.exports = {
    signup,
    login
}