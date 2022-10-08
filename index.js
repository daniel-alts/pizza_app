const express = require('express');
const passport = require("passport"); 
const mongoose = require('mongoose');
const usersRouter = require("./routes/usersRouter");
const ordersRouter = require("./routes/ordersRouter");
const authRouter = require('./routes/authRouter');
const { errorHandler } = require('./middlewares/error');
require("./middlewares/jwt_auth");


const PORT = 3334

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    return res.json({ status: true })
})



app.use("/", authRouter)
app.use("/users",  passport.authenticate("jwt", {session: false}), usersRouter)
app.use("/orders", passport.authenticate("jwt", {session: false}), ordersRouter)

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017')

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})