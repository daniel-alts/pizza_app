const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const connectToMongoDB = async () => {
	mongoose.connect(MONGODB_CONNECTION_STRING);
	mongoose.connection.on("connected", () => console.log("Connected to MongoDB Successfully."));
	mongoose.connection.on("error", (error) => {
		console.log("An error ocurred while connecting to MongoDB");
		console.log("Error: ", error);
	});
};

module.exports = { connectToMongoDB };
