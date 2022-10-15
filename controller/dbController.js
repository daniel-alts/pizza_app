const mongoose = require('mongoose');

const dbConnection = () => {
    
    mongoose.connect('mongodb://localhost/pizzza_app');
    
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
    
}
    

module.exports = dbConnection;