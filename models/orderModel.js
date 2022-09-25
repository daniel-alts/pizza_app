const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  created_at: { type: Date, default: new Date() },
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [
    {
      name: String,
      price: Number,
      size: { type: String, enum: ['m', 's', 'l'] },
      quantity: Number,
    },
  ],
})

/**
 * Convert id to string
 * Remove id object from response
 * Remove _v from response
 */
OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Order', OrderSchema)
