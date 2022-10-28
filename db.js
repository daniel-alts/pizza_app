const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

// connect to mongodb
function connectToMongoDB() {
    mongoose.connect(MONGODB_URL);

    mongoose.connection.on("connected", () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on("error", (err) => {
        console.log('Error connecting to MongoDB', err);
    })
}

module.exports = { connectToMongoDB };