const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const pizzaRoute = require("./routes/orderRoutes");
const userRoute = require("./routes/userRoutes");

const { connectToMongoDB } = require("./db");
require("dotenv").config();

require('./authentication/authenticateUser');

const PORT = process.env.PORT;
const app = express()  

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", userRoute)
app.use('/order', passport.authenticate('jwt', { session: false }), pizzaRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the World of Pizza!")
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})

module.exports = app