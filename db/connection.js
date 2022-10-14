const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// console.log(process.env.NODE_ENV);

const MONGODB_URI =
	process.env.NODE_ENV === "test"
		? process.env.TEST_MONGODB_URI
		: process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
	console.log(
		"Connected to MongoDB Successfully"
	);
});

mongoose.connection.on("error", (err) => {
	console.log(
		"An error occurred while connecting to MongoDB"
	);
	console.log(err);
});
