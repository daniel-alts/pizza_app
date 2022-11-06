const mongoose = require('mongoose');
require('dotenv').config();
const CONNECTION_URL = process.env.pizzaConnectionUrl


mongoose.connect(CONNECTION_URL)

function connectToMongodb(){
	
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});
}


module.exports = connectToMongodb;