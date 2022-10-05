const mongoose = require('mongoose');
require("dotenv").config()

const DATABASE_URL = process.env.DB_URL

function connectToDatabase() {

    mongoose.connect(DATABASE_URL)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connectToDatabase
}