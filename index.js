const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');

const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3334;

// Connect to MongoDB
db.connectToMongoDB();

const app = express();
app.use(express.static("public"));
app.use(express.json());

require("./authentication/auth") // Signup and login authentication middleware


app.get("/", (req, res) => {
  return res.json({ status: true });
});

const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const authRoute = require("./routes/auth")

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRoute);
app.use('/orders', passport.authenticate('jwt', { session: false }), orderRouter);

//routes
app.use("/orders", orderRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

module.exports = app;
