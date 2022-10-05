const mongoose = require('mongoose');
const { config } = require('dotenv');

config();

const DB_URI = process.env.DB_URI;

function connectMongoDB() {
  mongoose.connect(DB_URI);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Successfully');
  });

  mongoose.connection.on('error', err => {
    console.log('An error occurred while connecting to MongoDB');
    console.log(err);
  });
}

module.exports = { connectMongoDB };
