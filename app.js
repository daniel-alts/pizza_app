const express = require("express");
const session = require("express-session");
const userRoute = require("./routes/user.routes");
const orderRoute = require("./routes/order.routes");

const app = express();

app.use(express.json());

app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);

app.use("/user", userRoute);

app.use("/order", orderRoute);

app.get("/", (req, res) => {
	return res.json({ status: true });
});


module.exports = app;
