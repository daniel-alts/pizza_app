const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');



//pagination function
const printOrders = async(startValue, nPerPage) => {
        let orders = await orderModel.find({})
            .sort({ _id: -1 })
            .skip(startValue * nPerPage)
            .limit(nPerPage)


        return orders;


    }
    //function for protecting routes


const isAuthenticated = async(req, res, next) => {
    let authheader = req.headers.authorization;
    // console.log(req.headers);

    if (!authheader) {

        res.setHeader('WWW-Authenticate', 'Basic');

        return res.status(401).json({ message: 'Please provide authentication details' })

    }
    console.log(authheader);
    let auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];

    const userObj = await userModel.findOne({ username: user, password: pass });

    if (userObj) {

        // If Authorized user
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');

        return res.status(401).json({ message: 'User not authorized' })
    }
}

//throwaway login function
const isAuthenticatedforlogin = async(req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username, password: password });
    if (user) {
        next();
    } else {
        return res.status(404).json({ message: 'User not found' })
    }
}

module.exports = { isAuthenticatedforlogin, isAuthenticated, printOrders }