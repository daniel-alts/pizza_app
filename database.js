// import mongoose
const mongoose = require("mongoose");
require("dotenv").config()

const MONGODB_URI=process.env.MONGODB_URI

function connectToMongoDB() {
    mongoose.connect(MONGODB_URI);


    // on connect, call the callback
    mongoose.connection.on("connected", () => {
        console.log('successfully connected to mongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.log("error connecting to mongoDb", err);
    })
}

module.exports = { connectToMongoDB };