require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const bodyParser = require("body-parser");
require("../pizza_app/authentication/auth")
const PORT = process.env.PORT;
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", userRouter);
app.use("/orders", passport.authenticate("jwt", { session: false }), orderRouter);

app.get('/', (req, res) => {
    return res.json({ status: true })
})

mongoose.connect('mongodb://localhost:27017/pizza_app')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('server is listening at , ', PORT)
})