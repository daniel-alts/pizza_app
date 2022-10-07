const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "User-name must be provided"],
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
    },
    user_type: {
        type: String,
        enum: {
            values: ["admin", "user"],
        },
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;