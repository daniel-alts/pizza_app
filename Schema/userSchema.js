const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    username : {
        type: String,
        required: [true, "Please enter a unique username"],
        trim: true,
        unique: true,
    },

    email : {
        type: String,
        required: [true, "Please enter a valid email"],
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Please enter password"],
    },

    user_type: {

        type: String,
        required: [true, "Please select user or admin"],
        enum: ["user", "admin"],
        default: "user",
    },
});

var user = mongoose.model ('user',userSchema);
module.exports = user;
