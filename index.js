const express = require("express");
const mongoose = require("mongoose");
const orderModel = require("./models/order");

const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");

const authenticate = require("./auth");
const { connectDB } = require("./db");

const PORT = 3334;

const app = express();

app.set("view engine", "ejs")
app.set("views", "./views")

app.use("/public", express.static("public"))
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ status: true });
});

// Handle order routes
app.use(
    "/order",
    async (req, res, next) => {
        // Make sure user is authenticated
        const user = req.body.user;
        let authenticated = false;
        let error;
        await authenticate(user)
            .then(() => (authenticated = true))
            .catch((err) => (error = err));
            
        if (authenticated) next()
        else {
            if (error.message === "Incomplete query") res.status(400).send(error.toString())
            else res.status(401).send(error.toString())
        }
    },
    orderRouter
);

// Handle user routes
app.use("/user", userRouter);

app.get((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Connect to mongo atlas instance
connectDB();

app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
});
