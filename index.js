const express = require('express');
const orderRoute = require("./routes/orders")
const { connectToMongoDb } = require("./db")
// const {authenticate} = require("./authentication/authenticate")
const usersRoute = require("./routes/users")
require("dotenv").config()


const PORT = process.env.PORT

const app = express()

// connect to mongoDB instance
connectToMongoDb()

app.use(express.json());
// app.use(bodyParser.json())

app.use("/order", orderRoute)

app.use("/users", usersRoute)

// app.get('/', (req, res) => {
//    return res.json({ status: true})
// })

app.listen(PORT, ()=>{
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})
