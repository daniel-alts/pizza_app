const mongoose = require('mongoose');
require('dotenv').config();

MONGODB_CONNECTON_URL = process.env.MONGODB_CONNECTON_URL;

function connectTMongoDB() {
  mongoose.connect(MONGODB_CONNECTON_URL);

  mongoose.connection.on('connected', () => {
    console.log('connection successful');
  });
  mongoose.connection.on('error', (err) => {
    console.log('connection occured');
    console.log(err);
  });
}

module.exports = { connectTMongoDB };
