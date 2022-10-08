const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  username: {
    type: String,
    required: true
  }, 
  password: { 
    type: String, 
    required: true
},
  user_type: { 
    type: String, 
    enum: ['user', 'admin'],
    default: 'user',
    required: true
    }
   },{
    timestamps: true
   });

UserSchema.pre('save', function(){



})

UserSchema.methoda.comparePassword = async function(passcode){
  return await bcrypt.compare(passcode, password);
}



UserSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id, lp: this.lp, role: this.role}, process.env.SECRET ,{expiresIn: '1h'});
    return token;
}





const User = mongoose.model('User', UserSchema);


module.exports = User;
