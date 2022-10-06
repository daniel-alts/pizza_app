const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");
const  user = require("./routes/user")

const PORT = 3334;
//express app
const app = express();

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/order", user)
app.use("/order", orderRoutes);

//connecting to my localdb
mongoose
  .connect("mongodb://127.0.0.1:27017/pizza-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected succesfullly");

    //listen to port (I only want my server to run if the database is conneted succesfully)
    app.listen(PORT, () => {
      console.log("Listening on port, ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
