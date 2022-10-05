const express = require("express")
require("dotenv").config()
const {connectToMongodb} = require("./db")
const orderRoute = require("./router/order")
const userRoute = require("./router/users")

connectToMongodb()
const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.get('/',()=>{
    console.log("Home route")
})

app.use("/order",orderRoute)

app.use("/user", userRoute)


app.listen(PORT,()=>{
    console.log("Server is listening at PORT",PORT)
})