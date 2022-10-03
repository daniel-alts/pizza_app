const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require:true
    },
    password:{
        type: String,
        minLenght: 6,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    user_type: {
        type: String,
        enum: ['admin', 'user'],
        require:true
    },
    createAt : {
        type: Date,
        default:Date.now()
    },
    updatedAt : {
        type: Date,
        default:Date.now()
    }


});

const Users = mongoose.model('Users',userSchema );

module.exports = Users