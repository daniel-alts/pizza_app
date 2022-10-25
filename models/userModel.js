const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User