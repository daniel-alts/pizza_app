const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./index");

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/pizza_app";

mongoose.connect(DB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, HOST, () => {
  console.log(`Listening on port, ${PORT}`);
});
