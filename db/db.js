const mongoose = require("mongoose")
require('dotenv').config()

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL
const MONGODB_TEST_CONNECTION_URL = process.env.MONGODB_TEST_CONNECTION_URL

if (process.env.NODE_ENV == 'test') {
    function connectToMongoDb() {
        mongoose.connect(MONGODB_TEST_CONNECTION_URL)

        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB Successfully");
        })

        mongoose.connection.on("error", (err) => {
            console.log("An error occurred while connecting to MongoDB");
            console.log(err);
        })
    }
} else {
    function connectToMongoDb() {
        mongoose.connect(MONGODB_CONNECTION_URL)

        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB Successfully");
        })

        mongoose.connection.on("error", (err) => {
            console.log("An error occurred while connecting to MongoDB");
            console.log(err);
        })
    }
}


module.exports = { connectToMongoDb }