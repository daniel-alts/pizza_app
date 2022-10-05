const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.ObjectId
const userSchema = mongoose.Schema({
    id: ObjectId,
    username: {
        type: String,
        unique: true
    },
    password: String,
    created_at: {
        type: Date
    },
    user_type: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
})

module.exports = mongoose.model("users", userSchema)