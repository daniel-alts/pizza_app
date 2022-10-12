const express = require("express");
const bodyParser = require("body-parser");

const { connectToMongoDB } = require("./database/db");

const orderRoute = require("./routes/order");

require("dotenv").config();

const PORT = 3334;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.json({ status: true });
});

// USER

app.post("/signup", async (req, res) => {
  const body = req.body;

  const user = await userModel.create(body);

  return res.json({ status: true, user });
});

connectToMongoDB(
  app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
  })
);
