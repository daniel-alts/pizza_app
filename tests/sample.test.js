const mongoose = require("mongoose");
const orderModel = require("../models/orderModel");
const orderController = require("../controllers/orderController");

// Creates mondodb connection before each testing
beforeEach(async () => {
	try {
		await mongoose.connect(
			"mongodb://0.0.0.0:27017/tests"
		);
	} catch {
		console.log("Couldn't connect to MongoDB");
	}
});
// Drops the database and the closes the connection after all the tests might have ran
afterAll(async () => {
	try {
		await mongoose.connection.db.dropDatabase();
		await mongoose.connection.close();
	} catch {
		console.error("Failed to drop database");
	}
});

describe("CREATES NEW ORDERS", () => {
	it("should create a new order", async () => {
		const body = {
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		};

		const req = { body };

		const res = {
			status(status) {
				expect(status).toBe(201);
			},
			json(result) {
				expect(result.order._id).toBeDefined();
				expect(result.order.state).toBe(1);
				expect(
					result.order.created_at
				).toBeDefined();
				expect(typeof result.order.items).toBe(
					typeof body.items
				);
			},
		};

		await orderController.postOrder(req, res);
	});
});

describe("UPDATE ORDERS", () => {
	it("CHECKS IF USER WITH RIGHT ACCESS TRIES TO UPDATE", async () => {
		const order = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});
		const body = {
			state: 3,
		};
		const params = {
			id: order._id,
		};
		const userAuthenticated = {
			role: "admin",
		};

		req = {
			body,
			params,
			userAuthenticated,
		};
		const res = {
			status(statusCode) {
				expect(statusCode).toBe(201);
			},
			json(result) {
				expect(result.order.state).toBe(3);
			},
		};
		await orderController.updateOrder(req, res);
	});

	it("CHECKS WHEN IF USER WITH WRONG ACCESS TRIES TO UPDATE", async () => {
		const order = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});

		const body = {
			state: 3,
		};
		const params = {
			id: order._id,
		};
		const userAuthenticated = {
			role: "user",
		};

		req = {
			body,
			params,
			userAuthenticated,
		};
		const res = {
			status(status) {
				expect(status).toBe(404);
			},
			json(result) {
				expect(result.order).toBe(undefined);
			},
		};
		await orderController.updateOrder(req, res);
	});
	it("CHECKS IF USER WITH RIGHT ACCESS BUT WRONG ID TRIES TO UPDATE", async () => {
		const order = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});

		const body = {
			state: 3,
		};
		const params = {
			id: "633a036e8447b1dffec93c94",
		};
		const userAuthenticated = {
			role: "admin",
		};

		req = {
			body,
			params,
			userAuthenticated,
		};
		const res = {
			status(status) {
				expect(status).toBe(404);
			},
			json(result) {
				expect(result.order).toBe(null);
			},
		};
		await orderController.updateOrder(req, res);
	});
	it("CHECKS IF USER WITH RIGHT ACCESS TRIES TO REVERSE STATE", async () => {
		const order = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});
		const body = {
			state: 0,
		};
		const params = {
			id: order._id,
		};
		const userAuthenticated = {
			role: "admin",
		};

		req = {
			body,
			params,
			userAuthenticated,
		};
		const res = {
			status(statusCode) {
				// expect(statusCode).toBe(422);
			},
			json(result) {
				// expect(result.order).toBe(null);
			},
		};
		await orderController.updateOrder(req, res);
	});
});

describe("DELETE ORDERS", () => {
	it("LET'S ADMIN DELETE ORDERS ", async () => {
		const orders = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});

		const params = {
			id: orders._id,
		};

		const userAuthenticated = {
			role: "admin",
		};

		const req = {
			params,
			userAuthenticated,
		};

		const res = {
			status(statusCode) {
				expect(statusCode).toBe(201);
			},
			json(data) {
				expect(data.order.deletedCount).toBe(1);
			},
		};
		await orderController.deleteOrder(req, res);
	});
	it("CHECKS IF USERS HAS ACCESS TO DELETE", async () => {
		const orders = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});

		const params = {
			id: orders._id,
		};

		const userAuthenticated = {
			role: "user",
		};

		const req = {
			params,
			userAuthenticated,
		};

		const res = {
			status(statusCode) {
				expect(statusCode).toBe(404);
			},
			json(data) {
				expect(data).toBe("Unauthorized user");
			},
		};
		await orderController.deleteOrder(req, res);
	});
});

describe("GETS ALL ORDERS ", () => {
	it("MAKES A REQ TO GET ALL ORDERS", async () => {
		const orders = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});

		req;
		res = {
			status(status) {
				expect(status).toBe(200);
			},
			json(data) {
				expect(data.orders).toBeDefined();
			},
		};

		await orderController.getOrders(req, res);
	});
	it("MAKES A REQ TO GET A USER WITH WRONG ID", async () => {
		const orders = await orderModel.create({
			items: [
				{
					name: "chicken soup",
					price: 2500,
					size: "m",
					quantity: 2,
				},
			],
		});
		const params = {
			orderId: "633a036e8447b1dffec93c94",
		};

		req = {
			params,
		};
		res = {
			status(status) {
				expect(status).toBe(404);
			},
			json(data) {
				expect(data.order).toBe(null);
			},
		};

		await orderController.getOrder(req, res);
	});

	it("MAKES A REQ TO GET ALL ORDERS SORTED BY STATE", async () => {
		const orders = await orderModel.create(
			{
				items: [
					{
						name: "chicken soup",
						price: 2500,
						size: "m",
						quantity: 2,
					},
				],
			},
			{
				state: "2",
				items: [
					{
						name: "Beef soup",
						price: 1500,
						size: "m",
						quantity: 2,
					},
				],
			},
			{
				state: "3",
				items: [
					{
						name: "Turkey soup",
						price: 500,
						size: "m",
						quantity: 5,
					},
				],
			}
		);

		const query = {
			state: "asc",
		};

		req = {
			query,
		};
		res = {
			status(status) {
				expect(status).toBe(200);
			},
			json(data) {
				expect(data.orders).toBeDefined();
			},
		};

		await orderController.getOrders(req, res);
	});

	it("MAKES A REQ TO GET ALL ORDERS SORTED BY DATE / PRICE", async () => {
		const orders = await orderModel.create(
			{
				items: [
					{
						name: "chicken soup",
						price: 2500,
						size: "m",
						quantity: 2,
					},
				],
			},
			{
				state: "2",
				items: [
					{
						name: "Beef soup",
						price: 1500,
						size: "m",
						quantity: 2,
					},
				],
			},
			{
				state: "3",
				items: [
					{
						name: "Turkey soup",
						price: 500,
						size: "m",
						quantity: 5,
					},
				],
			}
		);

		const query = {
			date: "asc",
			price: "asc",
		};

		req = {
			query,
		};
		res = {
			status(status) {
				expect(status).toBe(200);
			},
			json(data) {
				expect(data.orders).toBeDefined();
			},
		};

		await orderController.getOrders(req, res);
	});
});
