const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport")


const orderModel = require("./models/order");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");

const authenticate = require("./auth/basic");
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
        if (req.url.match(/\/*/) && req.method === "GET") {
            /**
             * Allow everyone to view orders without authentication
             * because I can't modify the request object from browsers.
             * 
             * This route is best viewed on browser because I return html 
             * with some stylings and thunder client can't view that properly
             */
            next()
        } else {
            // Make sure user is authenticated
            const {username, password} = req.body.user;
            let authenticated = false;
            let error;
            await authenticate(username, password)
                .then(() => (authenticated = true))
                .catch((err) => (error = err));
                
            if (authenticated) next()
            else {
                if (error.message === "Incomplete query") res.status(400).send(error.toString())
                else res.status(401).send(error.toString())
            }

        }
    },
    orderRouter
);

// Handle user routes
app.use(
    "/user", 
    async (req, res, next) => {
        if (req.method === "POST") {

            next()
        }
        // Make sure only admins can read, update and delete users
        else {
            const authHeader = req.headers.authorization
            // Parse username and password from `Basic` authentication header
            const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
   
            let userType
            let error;
            await authenticate(username, password)
                .then((user) => {
                    userType = user.user_type
                })
                .catch((err) => (error = err));

            if (error) res.status(400).send(error.toString())
            else if (userType !== "admin") res.status(400).send("You must be an admin to access this route")
            else next()
        }

    }, 
    userRouter
);

app.get((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Connect to mongo atlas instance
connectDB();

app.listen(PORT, () => {
    console.log("Listening on port, ", PORT);
});
