const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

function DBconnection() {
  mongoose.connect(DB_URL);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
  });
}

module.exports = { DBconnection };
