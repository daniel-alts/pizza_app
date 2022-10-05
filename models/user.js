const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserSchema = new Schema  ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true },
    token: {type: String},
    user_type: {type: String, defualt: "user", enum: ["admin", "user"]}
})


module.exports= mongoose.model("user", UserSchema)