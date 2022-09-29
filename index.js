const express = require("express");
const bodyParser = require("body-parser")

const { orderRouter } = require("./routes/order");
const { userRouter } = require("./routes/users");

const app = express();

// app.use(express.json());
app.use(bodyParser.json());

app.use("/orders", orderRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use((req,res,next) => {
  const error = new Error("page not found")
  error.status = 404
  next(error)
})

app.use((error,req,res,next) => {
  return res.status(error.status).json({message: error.message})
  // next()
})

module.exports = {
    app
}