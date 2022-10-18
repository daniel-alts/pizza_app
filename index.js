require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const { connectToMongoDB } = require("./DBConnection.js");
const orderModel = require("./models/orderModel");
const UsersModel = require("./models/userModel");
const ordersRouter = require("./routes/ordersRoute");
// const usersRouter = require("./routes/userRoute");

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
// app.use("/users", usersRouter);

// app.patch("/orders/:id", async (req, res) => {
// 	const { id } = req.params;
// 	const { state, items } = req.body;

// 	let order = await orderModel.findById(id);

// 	if (!order) {
// 		res.status(404).json({ status: false, order: null });
// 	}

// 	if (state < order.state) {
// 		res.status(422).json({ status: false, order: null, message: "Invalid operation" });
// 	}

// 	order.items = items;
// 	order.state = state;

// 	await order.save();

// 	res.json({ status: true, order });
// });

// app.delete("/orders/:id", async (req, res) => {
// 	const { id } = req.params;

// 	const order = await orderModel.deleteOne({ _id: id });

// 	res.json({ status: true, order });
// });

app.listen(PORT, () => {
	console.log("Listening on port, ", PORT);
});
