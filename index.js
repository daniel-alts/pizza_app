const express = require("express");
const passport = require("passport");
const bodyParser = require('body-parser');
require('dotenv').config()

// routes
const ordersRoute = require("./routes/orders");
const usersRoute = require("./routes/users");

// connect to mongodb
require('./db').connectToMongoDB() // Connect to MongoDB

require("./authentication/authenticate") 

const PORT = process.env.PORT || 4000;

const app = express();

// parsing the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use('/', usersRoute);
app.use('/orders', passport.authenticate('jwt', { session: false }), ordersRoute);

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Welcome to the Pizza Store",
    status: true,
  });
});

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on: https://localhost:${PORT}`);
});
