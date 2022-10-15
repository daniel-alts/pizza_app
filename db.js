const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB_CONNECT_URL = process.env.MONGO_DB_CONNECT_URL;

function connectToMongoDb() {
  mongoose.connect(MONGO_DB_CONNECT_URL);

  mongoose.connection.on("connected", () => {
    console.log("connected to mongo succesfully!!");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
}

module.exports = { connectToMongoDb };
