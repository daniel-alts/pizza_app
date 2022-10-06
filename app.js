
require ("express-async-errors")
require ("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db/connect")
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes")




const app = express()

app.use(express.json());
app.use('/api/v1/users', userRouter)
app.use("/api/v1/orders", orderRouter)



const PORT = 5000
const start = async () => {
	try {
		await connectDB(process.env.MONGO_DB_URL)
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}...`)
		});
		}catch (error) {
			console.log(error)
	}
};
start();


