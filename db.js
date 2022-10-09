const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;


// connect to mongodb
function connectToMongoDB() {
mongoose.connect(MONGODB_URI);
// || 'mongodb://localhost:27017'

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })

    return mongoose.connection
}

module.exports = { connectToMongoDB };