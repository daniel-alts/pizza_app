const mongoose = require("mongoose");

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI

function connectingToMongoDB() {
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log("Database Connected Successfully")
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error Connecting to MongoDb')
    })
}

module.exports = {connectingToMongoDB}