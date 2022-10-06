const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   username : {
      type : String,
      required : [true, "Username must be provided"],
      unique : true,
      trim : true,
      maxlength : 30,
      minlength : 3
   },
   password : {
      type : String,
      required : [true, "Password must be provided"],
      minlength : 6
   },
   user_type :{
      type: String,
      enum: {
         values: ['admin', 'user'],
         message: '{VALUE} is not supported'
      },
      default : 'user',
   },
   createdAt : {
      type: Date,
      default: Date.now()
   }

})
const User = mongoose.model('User', userSchema);

module.exports = User;