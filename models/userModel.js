const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;



const userSchema = new Schema({
  id: ObjectId,
  created_at: Date,
    username: {
      type: String,
      required: true,
      unique:true
  },
    password: {
      type: String,
      required: true,
      unique:true
  },
    user_type: { type: String, enum: ['admin','user']}
    
  
});





module.exports= mongoose.model('User', userSchema);


