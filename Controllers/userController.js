const express = require('express');
const userRoute = express.Router();
const User = require('../model/user')
const CryptoJS = require("crypto-js")
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


// Signup
userRoute.post("/signup", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        // Encrypt
        password: CryptoJS.AES.encrypt(req.body.password, PASSWORD_SECRET_KEY).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
userRoute.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong login details!")
        // Decrypt
        const hash_password = CryptoJS.AES.decrypt(user.password, PASSWORD_SECRET_KEY);
        const pass_word = hash_password.toString(CryptoJS.enc.Utf8);

        pass_word !== req.body.password && res.status(401).json("Wrong login details!");
        // res.status(200).json(user)
        // Destructuring the user to send other details except password

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, JWT_SECRET_KEY, {expiresIn:"2d"}
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = userRoute