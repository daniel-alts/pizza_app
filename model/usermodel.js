const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    user_type:{
        type:String,
        enum:['admin','user'],
        default: 'user'
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('User',userschema);
