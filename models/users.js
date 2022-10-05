const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    user_type:{
        type:String,
        enum: ["admin", "user"],
        default: "user",
        required: false,
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('users',UserSchema)