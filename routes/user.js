const express = require("express")
const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.end("Hello user")
})


module.exports = userRouter