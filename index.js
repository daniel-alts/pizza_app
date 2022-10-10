const express = require("express");
const bodyParser = require("body-parser")
const passport = require("passport")

require("dotenv").config()
require("./authentication/auth")

const { orderRouter } = require("./routes/order");
const { userRouter } = require("./routes/users");
const { connectToDb } = require("./db");
const PORT = process.env.PORT || 3334;

const app = express();

connectToDb()

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/users", userRouter);
app.use("/orders",passport.authenticate("jwt",{session: false}), orderRouter);

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use((req,res,next) => {
  const error = new Error("page not found")
  error.status = 404
  next(error)
})

app.use((error,req,res,next) => {
  const status = error.status || 500
  return res.status(status).json({message: error.message})
  // next()
})


app.listen(PORT, async () => {
  console.log("Listening on port, ", PORT);
});

module.exports = {
    app
}