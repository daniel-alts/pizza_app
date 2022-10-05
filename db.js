const mongoose = require('mongoose')
require('dotenv').config()

// define the mongoDB connection url
const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL

// define a function to check connection
function connectToMongoDb(){
    mongoose.connect(MONGO_DB_CONNECTION_URL)

    // event listener for mongoose both success and error logs
    mongoose.connection.on("connected", ()=>{
        console.log("connection to mongoDB successful")
    })

    mongoose.connection.on("error", (err)=>{
        console.log(err)
        console.log("An error occured")
    })
}

// export function to be able to call when we want to connect to DB which ideally should be done when we start our server

module.exports ={connectToMongoDb}