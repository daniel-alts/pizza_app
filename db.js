const mongoose = require("mongoose");
require("dotenv").config();

const connectionUrl = process.env.CONNECT_URL;

function connectToDb() {
  mongoose.connect(connectionUrl);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
  });
}

module.exports = {
  connectToDb,
};
