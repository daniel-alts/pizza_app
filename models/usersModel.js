const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema(
    {
        id: ObjectId,
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        username:{
            type: Schema.Types.Mixed,
            required: true
        },
        password: {
            type: Schema.Types.Mixed,
            required: true
        },
        user_type: {
            type: String,
            enum: ["customer", "admin"],
            required: true
        }
    }
)

module.exports = mongoose.model("users", UserSchema)