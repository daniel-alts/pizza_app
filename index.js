const express = require("express");
const { connectToMongoDB } = require("./db");
require("dotenv").config();

const ordersRoute = require("./routes/orders");
const usersRoute = require("./routes/users");

const PORT = process.env.PORT;

const app = express();

// Connect to MongoDB Instance/Database
connectToMongoDB();

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "You are welcome",
    status: true,
  });
});

app.get("*", (req, res) => {
  return res.status(400).send({
    message: "Route does not exist",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port: https://localhost:${PORT}`);
});
