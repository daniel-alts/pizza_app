const mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION_URL = process.env.PIZZA_CONNECTION_URL;

function connectToMongoDB() {
  mongoose.connect(CONNECTION_URL);

  mongoose.connection.on("connected", () => {
    // console.log("connected to Mongodb succesfully")
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
    console.log("An error occured");
  });
}

module.exports = { connectToMongoDB };
