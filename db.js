const mongoose = require('mongoose');
require('dotenv').config()

module.exports = (MONGO_URI) => {
    mongoose
    .connect(MONGO_URI)
    .then(() => {
        
        console.log("Connected to MongoDB Successfully");
})
  .catch((err) => {
    
	console.log("An error occurred while connecting to MongoDB");
	console.log(err)
  })
}


