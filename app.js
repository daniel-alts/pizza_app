const express = require("express");

const db = require("../pizza_app/pizzaAppDb");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
require("dotenv").config;

const app = express();
const localhost = "127.0.0.1";
const PORT = process.env.PORT;

db.connectToMongoDB();
app.use(express.json());
app.use("/users", userRouter);
app.use("/orders", orderRouter);

// mongoose.connect("mongodb://localhost:27017");

// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB Successfully");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("An error occurred while connecting to MongoDB");
//   console.log(err);
// });
// authenticateUser();

app.get("/", (req, res) => {
  res.send("welcome home");
});
app.listen(PORT, localhost, () => {
  console.log("Listening on port, ", PORT);
});
module.exports = app;
