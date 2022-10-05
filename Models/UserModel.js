const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
    type: String,
    required: true, 
    min: 5,
    unique: true 
},
password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
},
userType: {
 type: String, 
 enum: ['admin', 'user']},

});


module.exports = mongoose.model("USER", UserSchema);