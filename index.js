const express = require('express');
const mongoose = require('mongoose');
const orderRouter = require("./Route/orderRoute")
const authRoute = require("./Route/authRoute")


const dotEnv = require('dotenv')
dotEnv.config()

const PORT = 8888

const app = express();

app.use(express.json());

app.use("/Api" , orderRouter)
app.use("/Api", authRoute )

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