const app = require("express")
const mongoose = require("mongoose")
require("dotenv")


function connectToMongodb(){
    const database_url = process.env.DATABASE_URL
    
    mongoose.connect(database_url)

    mongoose.connection.on("connected",()=>{
        console.log("connection to database is successful")
    })
    mongoose.connection.on("error",()=>{
        console.log("Error connecting to database")
    })
}

module.exports = {connectToMongodb}

