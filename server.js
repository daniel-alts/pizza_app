require("dotenv").config;
const connectToMongoDB = require("../pizza_app/pizzaAppDb");

const app = require("./app");

const PORT = process.env.PORT;
const localhost = "127.0.0.1";

connectToMongoDB();

app.listen(PORT, localhost, () => {
  console.log("Listening on port, ", PORT);
});
