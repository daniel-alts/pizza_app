const mongoose = require("mongoose");

const app = require("./index");

const PORT = 8000;
const HOST = "127.0.0.1";
const DB_URI = "mongodb://localhost:27017/pizza_app";

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
