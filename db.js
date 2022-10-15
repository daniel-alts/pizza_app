require('dotenv').config()

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

// CONNECT TO MONGOOSE
function connectToDb() {
    mongoose.connect(MONGODB_URI)

    // TESTING CONNECTION
    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully")
    })

    mongoose.connection.on('error', err => {
        console.log("An error has occurred while connecting to Mongodb")
        console.log(err)
    })
}

module.exports = { connectToDb }
