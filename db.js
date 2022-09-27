const mongoose = require('mongoose');


// connect to mongodb
function connectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017');

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })

    return mongoose.connection
}

module.exports = { connectToMongoDB };