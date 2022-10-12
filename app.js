// ****IMPORTING ALL DEPENDENCIES AND CREATE APP ************/
const express = require('express');
const  dbConnect  = require('./db');
require("dotenv").config()
const orderRouter = require('./routers/orderRoute');
const authentication = require('./controllers/user');
const userRouter = require('./routers/userRoute');
const app = express();

app.use(express.json());

//connecting to Mongodb instance
dbConnect()


module.exports = app;