const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

// connect to mongodb
function connectToMongoDB() {
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (error) => {
        console.log("Error connecting to MongoDB");
        console.log(error);
    })
};

module.exports = { connectToMongoDB };