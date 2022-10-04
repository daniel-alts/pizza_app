const mongoose = require('mongoose');

module.exports = (PORT, DB_URL) => {
    mongoose.connect(DB_URL)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });

}