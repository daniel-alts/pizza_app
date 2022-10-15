const express = require('express')
const { connectToMongoDB } = require("./db");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./authentication/auth") // Signup and login authentication middleware

require("dotenv").config();

const PORT = process.env.PORT;

const app = express()

// connect to Mongodb server
connectToMongoDB()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRoute);
app.use("/orders",  passport.authenticate('jwt', { session: false }), orderRoute);


app.get("/", (req, res) => {
    res.send("Welcome home")
})

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})


module.exports = app