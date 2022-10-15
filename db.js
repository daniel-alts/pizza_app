const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE_URI = process.env.DATABASE_URI;



// connect to mongodb
function connectToMongoDB() {
    mongoose.connect(DATABASE_URI);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
}

module.exports = { connectToMongoDB };