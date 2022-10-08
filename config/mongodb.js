const mongoose = require("mongoose")
require("dotenv").config()

const CONNECTTION_URL = process.env.CONNECT_TO_MONGO_ATLAS

function connectMongodb() {
    mongoose.connect(CONNECTTION_URL)

    mongoose.connection.on("connected", ()=>{
        console.log("Your database is connected successfully")
    })

    mongoose.connection.on("error", (err)=>{
        console.log(err)
    })
}

module.exports = { connectMongodb }