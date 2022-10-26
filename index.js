require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const logger = require("morgan");
const { connectToMongoDB } = require("./DBConnection.js");
const ordersRouter = require("./routes/ordersRoute");
const usersRouter = require("./routes/usersRoute");
const UserModel = require("./models/userModel");

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Create a connection to MongoDB.
connectToMongoDB();

app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
	res.json({ status: true, message: "Welcome to pizza_app." });
});

app.post("/signup", async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const body = req.body;
	const hash = await bcrypt.hash(body.password, salt);
	const user = await UserModel.create({
		username: body.username,
		password: hash,
		user_type: body.user_type,
		created_at: new Date(),
		updated_at: new Date(),
	});

	console.log("user", user);
	const token = jwt.sign({ user_id: user._id, user_type: user.user_type }, JWT_SECRET, { expiresIn: "1h" });
	res.status(200).json({ status: true, token });

	// return res.status(400).send({ status: false, message: err });
});

app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log("Listening on port, ", PORT);
});
