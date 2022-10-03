const mongoose = require("mongoose");
// const validators = require("validator").default;


//Instantiate the user schema
const Schema = mongoose.Schema

//Creating the new instance of User Schema
const userModel = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: [8, "Password cannot be less than 8!"],
        max: [10, "Password cannot be more than 10!"],
        required: true
    },
    email: {
        type: String,
    },
    user_type: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
})

//Export the Schema
module.exports = mongoose.model("User", userModel)