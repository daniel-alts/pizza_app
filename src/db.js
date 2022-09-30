const mongoose = require('mongoose');
require("dotenv").config();


const DATABASE_URI = process.env.DATABASE_URI;

const connectToDatabase = () => {
    mongoose.connect(DATABASE_URI);

    mongoose.connection.on("connected", () => {
        console.log('Connected to dabase successfully.');
    });

    mongoose.connection.on("error", () => {
        console.log('An error occured while trying to connect to database.');
    });
}



module.exports = {
    connectToDatabase,
}


