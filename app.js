require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const moment = require("moment")

const orderRoute = require('./routes/order')
const userRoute = require('./routes/user')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ status: true })
})

app.use("/user", userRoute)
app.use("/orders", orderRoute)


module.exports = app;