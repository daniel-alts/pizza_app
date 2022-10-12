// ** DATABASE CONNECTION ****//

const mongoose = require('mongoose');
require("dotenv").config()


const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

function dbConnect(){
    mongoose.connect(MONGO_DB_CONNECTION_URL)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });
    
    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
};

dbConnect();

module.exports = dbConnect