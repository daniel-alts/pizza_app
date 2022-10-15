require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./db");
const userRoute = require("./routes/user");
const errorHandler = require("./controllers/errHandler");
const orderRoute = require("./routes/order");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");

const app = express();

/*Connect to Server*/
const PORT = process.env.PORT;

/*Connect to Database*/
connectToMongoDB();

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRoute);
app.use(
    "/api/orders",
    passport.authenticate("jwt", { session: false }),
    orderRoute
);
app.use("/api/users", authRoute, userRoute);

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