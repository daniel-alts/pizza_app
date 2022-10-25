const express = require('express');
const mongoose = require('mongoose');
const orderRouter = require("./Route/orderRoute")
//const basicAuth = require("./middleware/basicAuth").default


const dotEnv = require('dotenv')
dotEnv.config()

const PORT = 8888

const app = express();

app.use(express.json());

//app.use(basicAuth)

app.use("/Api" , orderRouter)

mongoose.connect(process.env.DATABASE)

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})