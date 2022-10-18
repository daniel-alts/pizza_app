const userModel = require('../models/userModel');


const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({}).populate('orders', {items : 1, total_price: 1})
        return res.json({ status: true, users})
    } catch (err) {
        next (err)
    }
}


const createUser = async (req, res, next) => {
    try {
        res.json({
            status: true,
            message: 'Sign-up successful',
            user: req.user
        })
    } catch (err) {
        next (err)
    }
}

module.exports = { getAllUsers, createUser}