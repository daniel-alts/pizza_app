const mongoose = require('mongoose')


function connectDB() {
  try {
    mongoose.connect(
      'mongodb://0.0.0.0:27017/order'
    )

    mongoose.connection.on(
      'connected',
      () => {
        console.log(
          'Connected to MongoDB Successfully'
        )
      }
    )
  } catch {
    mongoose.connection.on(
      'error',
      (err) => {
        console.log(
          'An error occurred while connecting to MongoDB'
        )
        console.log(err)
      }
    )
  }
}

module.exports = connectDB
