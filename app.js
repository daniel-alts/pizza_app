const express = require("express")
const bodyParser = require("body-parser")
const passport = require("passport")

require("dotenv").config()
const {connectToMongodb} = require("./db")
const orderRoute = require("./router/order")
const authRoute = require("./router/auth")
const PORT = process.env.PORT

require("./authentication/auth")

connectToMongodb()
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', authRoute)
app.use("/order", passport.authenticate('jwt', {session: false}), orderRoute)

app.get('/',(req,res)=>{
   res.send("At home Route")
})


app.use(function (err, req,res,next){
    console.log(err)
    res.status(err.status || 500)
    res.json({error: err.message})
})

app.listen(PORT,()=>{
    console.log("Server is listening at PORT",PORT)
})

module.exports = app