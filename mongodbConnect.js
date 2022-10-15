const mongoose = require('mongoose');
require("dotenv").config();
const localhostUrl = process.env.MONGOBD_CONNECTION;

function connectToMongodb() {
mongoose.connect(localhostUrl);


mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb successfully!");
    })

mongoose.connection.on("error", (err) => {
    console.log(err);
    })
}

module.exports = { connectToMongodb };