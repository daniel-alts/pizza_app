require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./db");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const errorHandler = require("./middlewares/errHandler");

const app = express();

//Connect to Server
const PORT = process.env.PORT;

//Connect to Database
connectToMongoDB();

app.use(express.json());

app.use("api/orders", orderRoute);
app.use("api/users", userRoute);

app.all("/", (req, res) => {
    return res.json({ status: true });
});
app.use(errorHandler);





app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
});