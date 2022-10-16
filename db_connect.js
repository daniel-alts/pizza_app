const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
// console.log(MONGO_DB_URL);

function connectToMongoDB() {
  mongoose.connect(MONGO_DB_URL);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
  });
}

module.exports = { connectToMongoDB };
