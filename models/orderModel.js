const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    size: { type: String, enum: ['m', 's', 'l']},
    quantity: Number,
  }],
  user: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
});


OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    returnedObject.items.forEach((item) => {
      item.item_id = item._id.toString()
      delete item.id
    })

  }
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
