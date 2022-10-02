const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    firstName: {
        type: String,
        required:[true, "first name is required"]
    },
    lastName:{
        type:String,
        required:[true, "last name is required"]
    },
    username:{
        type:String,
        required:[true, "username is required"],
        unique:true
    },
    password:{
        type:Number,
        required:[true, 'PassWord is required']
    },
    user_type:{
        type: String,
        enum:['admin', 'user']
    }
})

module.exports = mongoose.model('User', userSchema)