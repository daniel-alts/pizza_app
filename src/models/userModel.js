const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = Schema(
    {
        "username": {
            type: String,
            required: true,
            unique
        },
        "password": {
            type: String,
            required: true,
        },
        "userType": {
            type: String,
            required: true
        }
    }
);



module.exports = mongoose.model("users", userSchema);