const mongoose = require('mongoose')
require("dotenv").config()

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL


function connectToMongoDB() {
    mongoose.connect(MONGO_DB_CONNECTION_URL)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB suceessfull")
    })

    mongoose.connection.on("error", (err) => {
        console.log(err)
        console.log("Ann error occured")
    })
}

module.exports = { connectToMongoDB }

// module.exports = () => {
//     mongoose
//         .connect(process.env.URI)
//         .then(() => {
//             console.log(`Connection to MongoDB successful`)
//         })
//         .catch((err) => {
//             console.log(`Connection to MongoDB failed`, err.message)
//         })
// }