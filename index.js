const express = require('express');
const OrderRoute = require("./routes/orders")
const { connectToMongoDb } = require("./db")
const UsersRoute = require("./routes/users")
require("dotenv").config()


const PORT = process.env.PORT

const app = express()

// connect to mongoDB instance
connectToMongoDb()

app.use(express.json());

app.use("/", OrderRoute)

app.use("/users", UsersRoute)

// app.get('/', (req, res) => {
//    return res.json({ status: true})
// })

app.listen(PORT, ()=>{
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})
