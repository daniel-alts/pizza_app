const express = require("express");
const mongoose = require("mongoose");
const orderRouter = require("./routes/orders.js");
const userRouter = require("./routes/user.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/orders", orderRouter);
app.use("/users", userRouter);

app.all("/", (req, res) => {
	res.status(200).send("Welcome");
});

mongoose.connect(process.env.MONGODB_URI);

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

app.listen(process.env.PORT, () => {
	console.log(
		"Listening on port, ",
		process.env.PORT
	);
});

module.exports = app;
