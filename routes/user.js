const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/home", (req, res) => {
    res.end("Hello user");
});

// Create new user
userRouter.post("/", async (req, res) => {
    try {
        const userData = req.body;
        const user = await User.create(userData);
        return res.json(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = userRouter;
