require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.node === 'test' ? process.env.TEST_URI : process.env.URI
const SECRET = process.env.node === 'test' ? process.env.TEST_SECRET : process.env.SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
}
