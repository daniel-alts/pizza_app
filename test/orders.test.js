const supertest = require('supertest');
const app = require('../index');

afterAll(() => {
	supertest(app)
		.post('/orders')
		.send({
			items: [
				{
					name: 'Medium Pizza',
					price: 4000,
					size: 'm',
					quantity: 2,
					_id: '635815286378ebb7ea0e2cba',
				},
			],
		});
});

describe('accessing orders with auth', () => {
	it('get all orders', async () => {
		const response = await supertest(app)
			.get('/orders')
			.set({
				Authorization: `Bearer ${process.env.Authorization}`,
			});
		expect(response.statusCode).toBe(200);
	});

	it('get single order with id', async () => {
		const response = await supertest(app)
			.get('/orders/635815286378ebb7ea0e2cbb')
			.set({
				Authorization: `Bearer ${process.env.Authorization}`,
			});

		expect(response.statusCode).toBe(200);
	});

	it('post single order', async () => {
		const response = await supertest(app)
			.post('/orders')
			.set({
				Authorization: `Bearer ${process.env.Authorization}`,
			})
			.send({
				items: [
					{
						name: 'Large pizza',
						price: 8000,
						size: 'l',
						quantity: 2,
					},
				],
			});
		expect(response.status).toBe(200);
	});

	it('update single order with id', async () => {
		const response = await supertest(app)
			.patch('/orders/635815286378ebb7ea0e2cbc')
			.set({
				Authorization: `Bearer ${process.env.Authorization}`,
			})
			.send({
				state: 2,
			});

		expect(response.status).toBe(200);
	});

	it('delete single order with id', async () => {
		const response = await supertest(app)
			.delete('/orders/635815286378ebb7ea0e2cbd')
			.set({
				Authorization: `Bearer ${process.env.Authorization}`,
			});
		expect(response.status).toBe(200);
	});
});
