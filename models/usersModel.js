const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema(
    {
        id: ObjectId,
        
        firstName: {
            type: String,

        },
        lastName: {
            type: String
        },
        username:{
            type: Schema.Types.Mixed,
            required: true,
            unique: true
        },
        password: {
            type: Schema.Types.Mixed,
            required: true,
            unique: true
        },
        user_type: {
            type: String,
            default: "customer",
            enum: ["customer", "admin"],
        
        }
    }
)

const users = mongoose.model("users", UserSchema)

module.exports = users