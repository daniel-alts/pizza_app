const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { type: String, default: 'user', enum: ['admin', 'user'] },
})

/**
 * Convert id to string
 * Remove id object from response
 * Remove _v from response
 */
UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('User', UserSchema)
