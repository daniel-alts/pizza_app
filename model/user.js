const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userRole: {type: String, enum : ['user', 'admin'], default: 'user'}
})


userSchema.methods.hashPassword = async function (password) {

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash

}

userSchema.methods.isValidPassword = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

const User = mongoose.model('User', userSchema)


module.exports = User