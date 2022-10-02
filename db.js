const mongoose = require("mongoose");
require("dotenv").config();

const Mongo_DB_Connection_URL = process.env.Mongo_DB_Connection_URL;

function connectToMongoDB() {
    mongoose.connect(Mongo_DB_Connection_URL);

    mongoose.connection.on("connected", () => {
        console.log("Successfully connected to MongoDB");
    });
    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to MongoDB", err);
    });
}

module.exports = {connectToMongoDB};