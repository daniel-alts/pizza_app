const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth.routes");
const orderRoute = require("./routes/order.routes");
const userRoute = require("./routes/user.routes");

require("./utils/auth.utils");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", authRoute);

app.use(
	"/order",
	passport.authenticate("jwt", {
		session: false,
	}),
	orderRoute
);

app.use(
	"/users",
	passport.authenticate("jwt", {
		session: false,
	}),
	userRoute
);

app.get("/", (req, res) => {
	return res.send("Welcome to the Pizza API");
});

// Handle errors.
app.use(function (err, req, res, next) {
	console.log(err);
	res.status(err.status || 500);
	res.json({ error: err.message });
});

module.exports = app;
