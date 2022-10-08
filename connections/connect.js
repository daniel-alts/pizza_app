const mongoose = require('mongoose');
require('dotenv').config()

module.exports = function mongoConnect() {
    MONGO = process.env.MONGO_CONNECTION_URL
    mongoose.connect(MONGO)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}


