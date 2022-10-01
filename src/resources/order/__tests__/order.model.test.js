const { mongoose } = require('mongoose')
const  Order  = require('../order.model')
const moment = require('moment')


describe('Order model', () => {
	describe('schema', () => {
		it('id', () => {
			const id = Order.schema.obj.id
			expect(id).toEqual(mongoose.Schema.ObjectId)
		})
		it('created_at', () => {
			const created_at =
				Order.schema.obj.created_at
			expect(created_at).toEqual({
				type: Date,
                default: Date
			})
		})
		it('state', () => {
			const state = Order.schema.obj.state
			expect(state).toEqual({
				type: Number,
				default: 1,
			})
		})
		it('total_price', () => {
			const total_price =
				Order.schema.obj.total_price
			expect(total_price).toEqual(Number)
		})
		it('items', () => {
			const items = Order.schema.obj.items[0]
			expect(items.name).toEqual(String)
			expect(items.price).toEqual(Number)
			expect(items.size).toEqual({
				type: String,
				enum: ['m', 's', 'l'],
			})
			expect(items.quantity).toEqual(
				Number,
			)
		})
	})
})
