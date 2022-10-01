const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  created_at: { type: Date, required: true },
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      size: { type: String, enum: ['m', 's', 'l'], required: true },
      quantity: { type: Number, required: true },
    },
  ],
})

/**
 * Convert id to string
 * Remove id object from response
 * Remove __v from response
 * Convert item id to item_id as string
 * Remove id object from item
 */
OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    returnedObject.items.forEach(item => {
      item.item_id = item._id.toString()
      delete item._id
    })
  },
})

module.exports = mongoose.model('Order', OrderSchema)
