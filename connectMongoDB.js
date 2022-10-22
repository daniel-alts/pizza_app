const mongoose = require('mongoose')
require('dotenv').config()
const connnectonUrl = process.env.MONGODB_CONNECTION_URL

function connectToDB() {
    mongoose.connect(connnectonUrl)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully!");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}


module.exports = connectToDB