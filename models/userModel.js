const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true 
    },
  password: {
        type: String,
        required: true,
        min: [6, "password must be morethan 6 inputs"]

    },
  roles: {
        type: String,
        enum: ['user', 'admin'],
        default: "user",
        required: true
    
    },
})

const user = mongoose.model("user", userSchema)

module.exports = user