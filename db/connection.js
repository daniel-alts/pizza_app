require("dotenv").config() // load .env variables
const mongoose = require("mongoose") //import fresh mongoose object
//const {log} = require("mercedlogger") // import merced logger

//DESTRUCTURE ENV VARIABLES
const {MONGO_URI} = process.env 

//CONNECT TO DATABASE

function connectToMyDb() {
   
    mongoose.connect(MONGO_URI);

    mongoose.connection.on("connected", () => {
       
        console.log("connected to mongodb sucessfully")
    })

    mongoose.connection.on("error", (err) => {
        console.log(err)
        console.log("an error occured")
    })
}



// EXPORT CONNECTION
module.exports = {connectToMyDb}
