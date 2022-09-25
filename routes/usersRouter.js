const express = require("express");
const userModel = require("../userModel")

const usersRouter = express.Router();

// Get all users
usersRouter.get("/", async(req, res) => {
    const users = await userModel.find({})
        .then((users) => {
            res.status(200).send({users})
        })
        .catch((error) => {
            res.status(500).send({
                statusCode: 500,
                message: "Internal Server Error"
            })
        })
})

// Create new user
usersRouter.post("/", async(req, res) => {
    const body = req.body;
    const { username, password, user_type } = req.body;
    if(!username && !password && !user_type){
        res.status(400).send({
                statusCode: 400,
                message: "Bad Request"
        });
        return
    }
    const user = userModel.create(body)
    .then((user) => {
        res.status(201).send({user});
        return
    })
    .catch((error) => {
        res.status(500).send({
            statusCode: 500,
            message: "Internal Server Error"
        });
    })
})

module.exports = usersRouter