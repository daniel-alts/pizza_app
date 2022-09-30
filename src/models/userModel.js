const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userModel = new Schema({
    id: ObjectId,
    created_at: Date,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, 'password must be at leat 6 characters'],
        match: [/^[a-zA-Z0-9]{6,30}$/]
    },
    user_type: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
        type: String,
        required: true,
    }

})

const User = mongoose.model("user", userModel);

module.exports = User