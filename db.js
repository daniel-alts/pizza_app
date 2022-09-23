const mongoose = require("mongoose")

require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI

function connectDB() {
    mongoose.connect(MONGO_URI);

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}


module.exports = {
    connectDB
}