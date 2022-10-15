const mongoose = require('mongoose')
require("dotenv").config()


const mongooseConnectUrl = process.env.MONGODB_CONNECTION_URL

function mongodbConnect() {
    mongoose.connect(mongooseConnectUrl)

    mongoose.connection.on("connected", (() => {
        console.log("connection successful")
    }))

    mongoose.connection.on("error", ((err) => {
        console.log(err)
    }))
}

module.exports = mongodbConnect