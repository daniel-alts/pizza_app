const mongoose = require('mongoose')
const moment = require('moment')
const orderController = require('./order.controller')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const OrderSchema = new Schema({
  // id: ObjectId,
  created_at: {
    type: Date,
    default: Date
  },
  state: { type: Number, default: 1 },
  total_price: Number,
  items: [
    {
      name: String,
      price: Number,
      size: {
        type: String,
        enum: ['m', 's', 'l']
      },
      quantity: Number
    }
  ],
  user: {
    type: ObjectId,
    ref: 'User'
  }
})

OrderSchema.pre(
  'save',
  async function (next) {
    let order = this

    order.items.reduce((prev, curr) => {
      prev += curr.price * curr.quantity
      order.total_price = prev
      next()
    }, 0)

    // Add default created at on save
    order.created_at.default =
      moment.toDate()
  }
)

// I'd be back for you someday
// OrderSchema.methods.sortOrder =
// 	function (orderBy) {
// 		const order = this
// 		console.log(order)
// 		const orderOfSort = (value) =>
// 			value === 'asc'
// 				? 1
// 				: value === 'desc'
// 				? -1
// 				: false
// 		console.log(orderOfSort('asc'))
// 		if (orderBy == price) {
// 			const sortByPrice =
// 				orderOfSort(price)
// 			console.log(sortByPrice)
// 			if (sortByPrice) {
// 				return order
// 					.find({})
// 					.sort({ total_price: sortByPrice })
// 			} else if (orderBy == date) {
// 				const sortByDate = orderOfSort(date)
// 				return order
// 					.find({})
// 					.sort({ created_at: sortByDate })
// 			}
// 		}
// 	}

const Order = mongoose.model(
  'Order',
  OrderSchema
)

module.exports = Order
