const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OrderSchema = new Schema({
	id: ObjectId,
	created_at: {
		type: Date,
		default: Date,
	},
	state: { type: Number, default: 1 },
	total_price: Number,
	items: [
		{
			name: String,
			price: Number,
			size: {
				type: String,
				enum: ['m', 's', 'l'],
			},
			quantity: Number,
		},
	],
})

OrderSchema.pre(
	'save',
	async function (next) {
		let order = this

		await order.items.reduce(
			(prev, curr) => {
				prev += curr.price * curr.quantity
				order.total_price = prev
				next()
			},
			0,
		)

		order.created_at.default =
			moment.toDate()
	},
)

const Order = mongoose.model(
	'Order',
	OrderSchema,
)

module.exports = Order
