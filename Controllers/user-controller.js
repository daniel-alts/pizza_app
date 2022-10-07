const User = require("../ScemaModels/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async(req, res) => {
    try {
        // hash the password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // create a new user
        const user = await User.create(req.body);
        // send new user as response
        res.json(user);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.loginUser = async(req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                // sign token and send it in response body
                const token = await jwt.sign({ username: user.username },
                    process.env.JWT_SECRET
                );
                res.json({ token });
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};