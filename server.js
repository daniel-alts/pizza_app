const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

//environment variable
const mongoDb_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3334;

mongoose.connect(mongoDb_URI);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to database successfully");
});
db.on("error", (err) => {
  console.log("error occurred during connection:", err);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
