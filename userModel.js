const mongoose = require('mongoose');
bycrypt = require(bycrypt);

const Schema = mongoose.Schema;

 const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
    user_type:{ type: String, enum: ['admin','user'], required: true},
    });
    
    
    const Users = mongoose.model("User", UserSchema);

    module.exports = Users;