const express = require("express");
const jwt = require("jsonwebtoken")

const userRouter = express.Router();
const User = require("../models/user");

// Get all users
userRouter.get("/", async (req, res) => {
    const users = await User.find().exec();
    res.send(users);
});

// Create new user
userRouter.post("/", async (req, res) => {
    try {
        const userData = req.body;
        const user = await User.create(userData);

        // Generate jwt token for new user
        const payload = {
            id: user._id, 
            username: user.username, 
            user_type: user.user_type
        }
        console.log(payload)
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET)

        return res.json({token: jwtToken});
    } catch (err) {
        return res.status(400).send(err.toString());
    }
});

// Update user details
userRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const userUpdateData = req.body;

    try {
        await User.findByIdAndUpdate(id, userUpdateData, {
            runValidators: true,
        }).exec();
        const updatedUser = await User.findById(id).exec();
        return res.json(updatedUser);
    } catch (err) {
        return res.status(400).send(err);
    }
});

// Delete user
userRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const userToBeDeleted = await User.findById(id);
        await User.deleteOne({ _id: id }).exec();

        if (userToBeDeleted) return res.send(userToBeDeleted);
        return res.status(404).json({"error": "User to be deleted not found"})
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = userRouter;
