const mongoose = require('mongoose');
require('dotenv').config();

MONGODB_URL = process.env.MONGODB_URL|| `mongodb://localhost:27017/`


function connectToMongoDB() {
    mongoose.connect(MONGODB_URL)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connectToMongoDB
};
