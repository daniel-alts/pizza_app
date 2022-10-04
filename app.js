const express = require("express");
const path = require("path");
// const session = require("express-session");
const userRoute = require("./routes/user.routes");
const orderRoute = require("./routes/order.routes");

const app = express();

app.use(express.json());

// app.use(
// 	session({
// 		secret: "secret",
// 		resave: false,
// 		saveUninitialized: true,
// 	})
// );

app.use("/users", userRoute);

app.use("/order", orderRoute);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	return res.json({ status: true });
});


module.exports = app;
