const mongoose = require('mongoose');


module.exports = function mongoConnect() {
    mongoose.connect('mongodb://0.0.0.0:27017')

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}


