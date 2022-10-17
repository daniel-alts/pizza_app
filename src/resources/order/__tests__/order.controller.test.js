const controllers = require('../order.controller')
const { isFunction } = require('lodash')

describe('order controllers', () => {
	it('checks whether there is a crud controller', () => {
		const crudMethods = [
			'createOrder',
			'checkOrderById',
			'checkAllOrder',
			'orderState',
			'deleteOrder',
		]

		crudMethods.forEach((name) => {
			expect(
				isFunction(controllers[name]),
			).toBe(true)
		})
	})
})
