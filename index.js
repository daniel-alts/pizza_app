const express = require("express");
const mongoose = require("mongoose");

const orderRouter = require("./routes/orders.js");
const userRouter = require("./routes/user.js");
const userModel = require("./models/userModel");

const PORT = 3334;

const app = express();

app.use(express.json());
app.use("/orders", orderRouter);
app.use("/users", userRouter);

app.all("/", (req, res) => {
	res.status(200).send("Welcome");
});

mongoose.connect(
	"mongodb://localhost:27017/foodApp"
);

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

app.listen(PORT, () => {
	console.log("Listening on port, ", PORT);
});
