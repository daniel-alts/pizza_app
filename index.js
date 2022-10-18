require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const { connectToMongoDB } = require("./DBConnection.js");
const ordersRouter = require("./routes/ordersRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();
const PORT = process.env.PORT;

// Create a connection to MongoDB.
connectToMongoDB();

app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
	res.json({ status: true, message: "Welcome to pizza_app." });
});

app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log("Listening on port, ", PORT);
});
