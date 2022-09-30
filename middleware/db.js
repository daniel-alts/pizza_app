const mongoose = require('mongoose')

module.exports = () => {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log(`Connection to MongoDB successful`)
    })
    .catch((err) => {
      console.log(`Connection to MongoDB failed`, err.message)
    })
}
