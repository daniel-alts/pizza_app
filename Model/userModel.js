const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    
    },
    userType: {
        type: String,
        enum: ['admin', 'user']
    }
    
})

module.exports = mongoose.model('Users', userSchema)
