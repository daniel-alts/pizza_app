const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { type: String, default: 'user', enum: ['admin', 'user'] },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

// Encrypt password before saving to the database
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Check if password is valid
UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

/**
 * Convert id to string
 * Remove id object from response
 * Remove _v from response
 * Remove password from response
 */
UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

module.exports = mongoose.model('User', UserSchema)
