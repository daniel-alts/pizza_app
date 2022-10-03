const express = require('express');
// const moment = require("moment");
const { DBConnection } = require("./db");
const orderRoute = require("./routes/orders");
const UsersRoute = require("./routes/users");
require("dotenv").config();

const PORT = process.env.PORT
const app = express();

//Connecting to MongoDB Instance
DBConnection();

app.use(express.json());
app.use("/order", orderRoute);
app.use("/users", UsersRoute)

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})