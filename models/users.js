const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    user_type:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    created_at: Date,
})

module.exports = mongoose.model("user", userSchema)