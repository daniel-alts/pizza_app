const express = require('express');
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/orderRoute')
const passport = require("passport");
const bodyParser = require("body-parser");
const  authRouter = require("./routes/authRoute");
const { connectToMongoDB } = require('./db')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

// Connecting to MongoDB instance
connectToMongoDB()

app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

require("./utils/authMiddleware");
app.use("/", authRouter);

app.use(passport.authenticate("jwt", { session: false }),  ordersRoute);
app.use(userRoute);
app.use("**", (req, res) => {
	res.status(404).send({ message: "Route not found" })
})


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})