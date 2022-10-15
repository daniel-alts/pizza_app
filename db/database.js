const mongoose = require('mongoose');
require('dotenv').config();

function connection() {
  mongoose.connect('mongodb://localhost:27017');

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.log('An error occurred while connecting to MongoDB');
    console.log(err);
  });
}

module.exports = connection;