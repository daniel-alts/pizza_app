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
        required:[true, 'Please Provide Your password']
    },
    user_type:{
        type:String,
        required:[true, 'Please Provide Your user type'],
        enum:["admin","user"],
        message:"please specify the user type if admin or user"
    }

})

module.exports = mongoose.model("User",userSchema)