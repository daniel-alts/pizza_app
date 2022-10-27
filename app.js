const express = require("express");
require("./db/connection");
const orderRouter = require("./routes/orders.js");
const userRouter = require("./routes/user.js");
<<<<<<< HEAD
const passport = require("passport");
const app = express();
require("./authentication/auths");
app.use(express.json());
app.use(
	"/orders",
	// passport.authenticate("jwt", {
	// 	session: false,
	// }),
	orderRouter
);

=======

const app = express();

app.use(express.json());
app.use("/orders", orderRouter);
>>>>>>> 61ad9e8cf839370e9750724e39cbd5f813dbc09f
app.use("/users", userRouter);

app.all("/", (req, res) => {
	res.status(200).send("Welcome");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Listening on port, ", PORT);
});

<<<<<<< HEAD
=======

>>>>>>> 61ad9e8cf839370e9750724e39cbd5f813dbc09f
module.exports = app;
