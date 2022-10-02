const mongoose = require('mongoose')
require('dotenv').config()
const DB_Connection = process.env.MONGODB_URL_CONNECTION

function connectToMongoDB(){
    mongoose.connect(DB_Connection)
    mongoose.connection.on('connected', ()=>{
        console.log('Connection to MongoDB is successful')
    })
    mongoose.connection.on('error', (err)=>{
        console.log('Unable to Connect to MongoDB')
    })
}

module.exports = {connectToMongoDB}