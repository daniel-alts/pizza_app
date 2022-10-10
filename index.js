const express = require("express");
require("dotenv").config();
const db = require("./db");

const orderRoute = require("./routes/order");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// CONNECT TO DB
db.connectToDB();

// ORDER ROUTE
app.use("/order", orderRoute);

app.get("/", (req, res) => {
  return res.json({ status: true });
});


app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
