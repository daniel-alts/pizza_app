const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  userRole: {type: String, enum : ['user', 'admin']}
})

const User = mongoose.model('User', userSchema)


module.exports = User