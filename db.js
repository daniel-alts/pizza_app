const mongoose = require("mongoose");
require("dotenv").config;

const MONGO_DB_CONNECTION_URL = process.env.URL;

function connectToMongoDB() {
  mongoose.connect("mongodb://localhost:27017");

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
  });
}

module.exports = { connectToMongoDB };
