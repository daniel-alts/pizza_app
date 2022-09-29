const userModel = require('../models/user')

async function passwordAuth(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(400).json({ status: false, message: 'Invalid Request' })
    }
    const auth = new Buffer.from(authorization.split(" ")[1], 'base64').toString().split(":")

    const username = auth[0]
    const password = auth[1]

    const user = await userModel.find({ username: username })
    if (user.length === 0) {
        return res.status(404).json({ status: false, message: "User not found. Please signup" })
    }

    if (user[0].password !== password) {
        return res.status(400).json({ status: false, message: "Invalid password" })
    }

    next()
}

async function adminAuth(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(400).json({ status: false, message: 'Invalid Request' })
    }
    const auth = new Buffer.from(authorization.split(" ")[1], 'base64').toString().split(":")

    const username = auth[0]
    const password = auth[1]

    const user = await userModel.find({ username: username, password: password })
    if (user.length === 0) {
        return res.status(404).json({ status: false, message: "User not found. Please signup" })
    }

    if (user[0].user_type !== 'admin') {
        return res.status(401).json({ status: false, message: "You are unauthorized for this operation" })
    }

    next()
}

async function userAuth(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(400).json({ status: false, message: 'Invalid Request' })
    }
    const auth = new Buffer.from(authorization.split(" ")[1], 'base64').toString().split(":")

    const username = auth[0]
    const password = auth[1]

    const user = await userModel.find({ username: username, password: password })
    if (user.length === 0) {
        return res.status(404).json({ status: false, message: "User not found. Please signup" })
    }

    if (user[0].user_type !== 'user') {
        return res.status(401).json({ status: false, message: "You are unauthorized for this operation" })
    }

    next()
}


module.exports = {
    passwordAuth, adminAuth, userAuth
}