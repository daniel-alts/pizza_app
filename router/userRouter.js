const express = require("express")
const userModel = require("../models/userModel")
const { body, validationResult } = require("express-validator")
const { hashPassword } = require("../config/helper")
const authenticate = require("../auth/authenticate")
const { verifyUser } = require('../config/helper')

const userRouter = express.Router()

userRouter.post('/login', async (req, res) => {
    const { identity, password } = req.body
    const user = await verifyUser(identity, password)
    if (!user) {
        return res.status(401).send("Invalid crendentials")
    }
    const token = authenticate.generateToken({ id: user.id })
    res.json({
        msg: "Login successful!",
        token: token
    })
})

userRouter.post('/',
    body("username").notEmpty(),
    body("password").notEmpty(),
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).send(errors.array())
        }

        const newUser = req.body

        let userExist = await userModel.findOne({ username: newUser.username })
        if (userExist) {
            return res.status(409).send("This user already exist, pls try another credential")
        }
        const hashedPassword = await hashPassword(req.body.password)
        newUser.password = hashedPassword
        userModel.create(newUser)
            .then((data) => {
                res.status(201).json({
                    msg: "user created",
                    data
                })
            })
            .catch((err) => {
                res.status(400).send("And error just occured")
            })
    })


userRouter.get('/', (req, res) => {
    userModel.find({})
        .then((data) => {
            res.send(data)
        })
})

module.exports = userRouter