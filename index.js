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
try {
	connectToMongoDB();
} catch (err) {
	console.log("error: ", err);
	next();
}

app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
	res.json({ status: true, message: "Welcome to pizza_app." });
});

app.post("/signup", async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const body = req.body;
	const hash = await bcrypt.hash(body.password, salt);
	try {
		const user = await UserModel.create({
			username: body.username,
			password: hash,
			user_type: body.user_type,
			created_at: new Date(),
			updated_at: new Date(),
		});

		// console.log("user", user);
		const token = jwt.sign({ _id: user._id, username: user.username, user_type: user.user_type }, JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json({ status: true, token });
	} catch (err) {
		console.log("error: ", err);
		res.status(400).send({ status: false, message: "An error ocurred" });
	}
});

app.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			throw { status: 400, message: "username and password is required" };
		}
		const user = await UserModel.findOne({ username });
		if (!user) {
			throw { status: 400, message: "User not found." };
		}
		console.log("user: ", user);
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			throw { status: 400, message: "Incorrect username or password." };
		}
		const token = jwt.sign({ _id: user._id, username: user.username, user_type: user.user_type }, JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json({ status: true, token });
	} catch (err) {
		next(err);
	}
});

app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

// Handle errors.
app.use((err, req, res, next) => {
	console.log("error: ", err);
	res.status(err.status).json({ status: false, message: err.message });
});

app.listen(PORT, () => {
	console.log("Listening on port, ", PORT);
});
