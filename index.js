const express = require("express");
const connectToDatabase = require("./db"); // require connection to database

const ordersRouter = require("./routes/orders");
const userRouter = require("./routes/userRoute");

const PORT = 3334;

const app = express();

connectToDatabase(); //Handles coonection to database

// middlewares
app.use(express.json());
app.use("/order", ordersRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.json({ status: true, message: "Welcome to home page" });
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
