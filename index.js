require("dotenv").config();
const express = require("express");
<<<<<<< Updated upstream
const {connectToMongoDB} = require("./db");
=======
const { connectToMongoDB } = require("./db");
const mongoose = require("mongoose");
const OrderModel = require("./model/orderModel");
const UserModel = require("./model/userModel");
>>>>>>> Stashed changes
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const errorHandler = require("./middlewares/errHandler");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoute = require("./routes/user");

const app = express();

/*Connect to Server*/
const PORT = process.env.PORT;

/*Connect to Database*/
connectToMongoDB();

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< Updated upstream
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);
=======
app.use("/", authRoute);
app.use(
    "/api/orders",
    passport.authenticate("jwt", { session: false }),
    orderRoute
);
app.use("/api/users", authRoute, userRoute);
>>>>>>> Stashed changes

app.all("/", (req, res) => {
    return res.json({ status: true });
});
//Renders the home page.
app.get("/", (req, res) => {
    res.send("Welcome to the Pizza API");
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
});