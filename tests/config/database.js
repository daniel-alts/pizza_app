// const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017/pizza-test"

module.exports = {
  /** creates a mongoose connection */
  connect: (done) => {
    mongoose.connect(MONGO_URI)

    mongoose.connection.once('connected', () => {
      done();
    })

    mongoose.connection.on('error', (err) => {
      console.log(err);
      done(err)
    })
  },

  /** clear the mongoose database */
  clear: () => mongoose.connection.dropDatabase(),

  /** close the mongoose connection */
  close: async (done) => {
    mongoose.connection.close();
    mongoose.disconnect(done);
  }
}
