const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

exports.connectToDatabase = () => {
  mongoose.connect(MONGO_URI)

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.error(err);
  });
}