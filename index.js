const express = require("express");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/users");
const { connectToMongoDB } = require("./db");
const { password_authentication } = require("./authentication");
const jwt = require('jsonwebtoken');
require('./authentication/passport')

const PORT = 3334;
const app = express();

app.use(express.json());
connectToMongoDB();

app.use("/user", userRoute);

app.get("/", (req, res) => {
  return res.json({ status: true });
});
app.post("/books", async function (req, res) {
  const { email, password } = req.body;

  //Check If User Exists
  let foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(403).json({ error: "Email is already in use" });
  }

  const newUser = new User({ email, password });
  await newUser.save();
  // Generate JWT token
  const token = genToken(newUser);
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
