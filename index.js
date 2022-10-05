const express = require("express");
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 3334;

// Connect to MongoDB
db.connectToMongoDB();

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");

//routes
app.use("/orders", orderRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

module.exports = app;
