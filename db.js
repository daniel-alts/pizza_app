const mongoose = require('mongoose');
require('dotenv').config()

const DB_URI = process.env.DB_URI

// mongoose.connect('mongodb://localhost:27017')
mongoose.connect(DB_URI)

function dbConnected(){
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });
    
    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = dbConnected
