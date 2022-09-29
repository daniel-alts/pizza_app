const express = require("express");
const mongoose = require("mongoose");
const orderRoute = require("./routes/order");
const userRoute = require('./routes/users')
require("dotenv").config();

const PORT = 3334;

const app = express();

app.use(express.json());

app.use("/api/order", orderRoute);

app.use('/api/users', userRoute)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to the database and listening on",
        process.env.PORT,
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
