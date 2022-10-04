const mongoose = require("mongoose");

const userSchema = new mongoose.schema ({
    username : {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    user_type: {
        type: String,
        enum: ["user", admin],
        default: "user"
    },

    email: {
        type: String,
        unique: true,
        required: true,
    }


})


const user = mongoose.model('user', userSchema);

module.exports = user;

