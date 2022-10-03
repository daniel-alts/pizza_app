const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  username: {
    type:String,
    required: [true, "A username must be provided"],
  },
  password :{
    required :[true,"A password must be provided"]
  }

});
const User = mongoose.model('User',UserSchema);

module.exports = User;