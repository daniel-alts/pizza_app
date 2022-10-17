
const mongoose = require('mongoose');
require("dotenv").config();

function connectToMongoDb(){
    mongoose.connect(process.env.MONGOCONNECT_URI)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });
    
    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = { connectToMongoDb };