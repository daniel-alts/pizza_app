const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const DB_CONNECTION_URI =
  process.env.DB_CONNECTION_URI || "mongodb://localhost:27017/pizza_app";

mongoose.connect(DB_CONNECTION_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB DB successfully!!!");
});

mongoose.connection.on("error", () => {
  console.log("Connection to MongoDB DB was not successful!!!");
});

app.listen(PORT, HOST, () => {
  console.log("Server listening on PORT", PORT);
});
