const mongoose = require("mongoose")

const { Schema } = mongoose
const userModel = new Schema({
    firstName: String,
    lastName: String,
    date_Of_Birth: String,
    userName: String,
    password: String,
    userType: {type: String, enum: ["user", "admin"]}
})

module.exports = mongoose.model("user", userModel);