const express = require("express");
require("./db/connection");
const orderRouter = require("./routes/orders.js");
const userRouter = require("./routes/user.js");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/orders", orderRouter);
app.use("/users", userRouter);

app.all("/", (req, res) => {
	res.status(200).send("Welcome");
});

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
// 	console.log("Listening on port, ", PORT);
// });

module.exports = app;
