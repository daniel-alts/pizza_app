const mongoose = require('mongoose')




const userSchema = new mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:[true, 'Please Provide Your username'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please Provide Your password'],
        minlength:[6, "Your password should be a minimium of 6"]
    },
    user_type:{
        type:String,
        required:[true, 'Please Provide Your user type'],
        enum:["admin","user"]
    },
    createdAt:Date

})

module.exports = mongoose.model("User",userSchema)