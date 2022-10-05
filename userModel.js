const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please Provide Username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Provide Password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Provide Password Confirm'],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Password Do Not Match',
    },
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})
userSchema.methods.correctPassword = async function (providedPassword, userPassword) {
  return await bcrypt.compare(providedPassword,userPassword)
}
const User = mongoose.model('User', userSchema)
module.exports = User
