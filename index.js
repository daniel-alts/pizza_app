const express = require("express");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/users");
const { connectToMongoDB } = require("./db");
const { password_authentication } = require("./authentication");

const PORT = 3334;
const app = express();

app.use(express.json());
connectToMongoDB();
app.use("/order", password_authentication());
app.use("/users", userRoute);

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
