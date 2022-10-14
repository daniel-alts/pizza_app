require('dotenv').config();

module.exports = {
    'secretKey': process.env.secretKey,
    'mongoUrl': process.env.DB_URL,
    'port': process.env.PORT
}