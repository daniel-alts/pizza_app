const mongoose= require("mongoose")
require("dotenv").config()

const MONGO_DB_CONNECTION_URL= process.env.MONGO_DB_CONNECTION_URL


function connectToMongoDB() {
    mongoose.connect(MONGO_DB_CONNECTION_URL);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
}

module.exports = { connectToMongoDB };