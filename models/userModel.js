const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   username : {
      type : String,
      required : [true, "Username must be provided"],
      unique: [true, `Username Already taken`],
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
      default : 'user'
   }

})



const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;