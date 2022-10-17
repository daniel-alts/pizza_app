const {
	createOrder,
	checkOrderById,
	checkAllOrder,
	orderState,
	deleteOrder,
} = require('../crud')
const Order = require('../../resources/order/order.model')
const User = require('../../resources/user/user.model')
const mongoose = require('mongoose')

jest.setTimeout(20000) // resets Jest timeout time allow for execution.

// Creates mondodb connection before each testing
beforeEach(async () => {
	try {
		await mongoose.connect(
			'mongodb://0.0.0.0:27017/testing-order',
		)
		await mongoose.connection.db.dropDatabase()
	} catch {
		console.error(
			"Couldn't connect to MongoDB",
		)
	}
})

describe('createOrder', () => {
	it('create new order', async () => {
		expect.assertions(5)

		const user = await User.create({
			username: 'test',
			password: 'test',
		})
		const body = {
			items: [
				{
					name: 'peperoni',
					price: 1500,
					size: 's',
					quantity: 2,
				},
			],
		}

		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			body,
		}

		const res = {
			status(status) {
				expect(status).toBe(201)
				return this
			},
			json(result) {
				expect(
					result.data._id,
				).toBeDefined()
				expect(result.data.state).toBe(1)
				expect(
					result.data.created_at,
				).toBeDefined()
				expect(
					typeof result.data.items,
				).toBe(typeof body.items)
			},
		}

		await createOrder(Order)(req, res)
	})

	it('total_price was updated', async () => {
		expect.assertions(3)

		const user = await User.create({
			username: 'test',
			password: 'test',
		})
		const body = {
			items: [
				{
					name: 'peperoni',
					price: 1500,
					size: 's',
					quantity: 2,
				},
			],
		}

		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			body,
		}

		const res = {
			status(status) {
				expect(status).toBe(201)
				return this
			},
			json(result) {
				expect(
					result.data.total_price,
				).toBeDefined()
				expect(
					result.data.total_price,
				).toBe(3000)
			},
		}

		await createOrder(Order)(req, res)
	})
})

describe('checkOrderById', () => {
	it('check the order by ID', async () => {
		expect.assertions(2)

		const user = await User.create({
			username: 'test',
			password: 'test',
		})
		const order = await Order.create({
			items: [
				{
					name: 'peperoni',
					price: 1500,
					size: 's',
					quantity: 2,
				},
			],
		})
		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			params: {
				id: order._id,
			},
		}

		const res = {
			status(status) {
				expect(status).toBe(200)
				return this
			},
			json(result) {
				expect(
					result.data._id.toString(),
				).toBe(order._id.toString())
			},
		}

		await checkOrderById(Order)(req, res)
	})
})

describe('orderState', () => {
	it('is order state valid', async () => {
		expect.assertions(4)

		const user = await User.create({
			username: 'test',
			password: 'test',
		})
		const order = await Order.create({
			items: [
				{
					name: 'peperoni',
					price: 1500,
					size: 's',
					quantity: 2,
				},
			],
		})

		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			params: {
				id: order._id,
			},
			body: {
				state: order.state,
			},
		}

		const res = {
			status(status) {
				expect(status).toBe(200)
				expect(status).not.toBe(404)
				expect(status).not.toBe(422)
				return this
			},
			json(result) {
				expect(result.data.state).toBe(
					order.state,
				)
			},
		}

		await orderState(Order)(req, res)
	})
})

describe('deleteOrder', () => {
	it('should delete order', async () => {
		const user = await User.create({
			username: 'test',
			password: 'test',
			user_type: 'admin',
		})
		const order = await Order.create({
			items: [
				{
					name: 'peperoni',
					price: 1500,
					size: 's',
					quantity: 2,
				},
			],
		})

		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			params: {
				id: order._id,
			},
		}
		const res = {
			status(status) {
				expect(status).toBe(204)
				return this
			},
			json(result) {
				expect(`${result.data}`).toBe(
					'undefined',
				)
			},
		}

		await deleteOrder(Order)(req, res)
	})
})

describe('checkAllOrder', () => {
	it('check that all orders were returned', async () => {
		expect.assertions(4)

		const user = User.create({
			username: 'test',
			password: 'test',
		})
		const order = await Order.create([
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 2,
					},
				],
			},
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 3,
					},
				],
			},
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 5,
					},
				],
			},
		])

		const prices = [3000, 4500, 7500]

		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			query: {
				p: 1,
                price: 'asc'
			},
		}

		const res = {
			status(status) {
				expect(status).toBe(200)
				return this
			},
			json(results) {
				results.data.forEach((result, i) =>
					expect(
						`${order[i].total_price}`,
					).toBe(`${prices[i]}`),
				)
			},
		}

		await checkAllOrder(Order)(req, res)
	})
	it('check that pagination is working', async () => {
		expect.assertions(2)

		const user = User.create({
			username: 'test',
			password: 'test',
		})
		await Order.create([
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 2,
					},
				],
			},
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 3,
					},
				],
			},
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 5,
					},
				],
			},
		])

		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			query: {
				p: 1,
                price: 'asc'
			},
		}

		const res = {
			status(status) {
				expect(status).toBe(200)
				return this
			},
			json(results) {
				expect(results.data).toHaveLength(2)
			},
		}

		await checkAllOrder(Order)(req, res)
	})

	it('check if order returned is sorted by price', async () => {
		expect.assertions(5)

		const user = User.create({
			username: 'test',
			password: 'test',
		})
		const order = await Order.create([
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 2,
					},
				],
			},
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 3,
					},
				],
			},
			{
				items: [
					{
						name: 'peperoni',
						price: 1500,
						size: 's',
						quantity: 5,
					},
				],
			},
		])

		const prices = [3000, 4500, 7500]

		const req = {
			authenticatedUser: {
				username: user.username,
				role: user.user_type,
			},
			query: {
                p: 1,
				price: 'asc' || 'desc',
			},
		}

		const res = {
			status(status) {
				expect(status).toBe(200)
				return this
			},
			json(results) {
				results.data.forEach(
					(result, i) => {
						let j = i + 1
						expect(
							`${
								order[j].total_price >
								order[j - 1].total_price
							}` ||
								`${
									order[j].total_price <
									order[j - 1].total_price
								}`,
						).toBeTruthy()
					},
				)
			},
		}

		await checkAllOrder(Order)(req, res)
	})
})

// Drops the database and the closes the connection after all the tests might have ran
afterAll(async () => {
	try {
		await mongoose.connection.db.dropDatabase()
		await mongoose.connection.close()
	} catch {
		console.error(
			'Failed to drop database',
		)
	}
})
