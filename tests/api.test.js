const app = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const orderModel = require("../models/orderModel");
const orderController = require("../controllers/orderController");

const headers = (role) => {
	let headers;
	if (role === "admin") {
		const str = "odiwee:1234";
		const id =
			Buffer.from(str).toString("base64");
		const auth = `basic ${id}`;
		return (headers = { authorization: auth });
	} else if (role === "user") {
		const str = "andrew:1234";
		const id =
			Buffer.from(str).toString("base64");
		const auth = `basic ${id}`;
		return (headers = { authorization: auth });
	}
};
describe("CREATES NEW AND GETS ALL USERS", () => {
	it("CREATES NEW USERS", async () => {
		return request(app)
			.post("/users")
			.send(
				{
					userName: "odiwee",
					passWord: "1234",
					userType: "admin",
				},
				{
					userName: "andrew",
					passWord: "1234",
					userType: "user",
				}
			)
			.then((res) => {
				expect(res.status).toBe(201);
				expect(res.body.user).toBeDefined();
			});
	});
	it("CREATES NEW USERS BUT FAILS DUE TO DUPLICATES", async () => {
		return request(app)
			.post("/users")
			.send({
				userName: "odiwee",
				passWord: "1234",
				userType: "admin",
			})
			.then((res) => {
				expect(res.status).toBe(400);
			});
	});
	it("GETS ALL USERS", async () => {
		return request(app)
			.get("/users")

			.then((res) => {
				expect(res).toBeDefined();
				expect(res.status).toBe(200);
			});
	});
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
describe(" GET ORDER ROUTES", () => {
	it("MAKES NEW ORDER", async () => {
		return (
			request(app)
				.post("/orders")
				// .set(headers("admin"))
				.send({
					items: [
						{
							name: "emeka",
							price: 450,
							size: "l",
							quantity: 10,
						},
					],
				})
				.then((res) => {
					expect(res.status).toBe(200);
					expect(res.body.order).toBeDefined;
				})
		);
	});
	it("GETS ALL ORDERS", async () => {
		return request(app)
			.get("/orders")
			.set(headers("admin"))
			.then((res) => {
				expect(res.body.status).toBe(true);
			});
	});
	it("RETURNS A SINGLE ORDER BY ID", async () => {
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

		const newId = orders._id;
		return await request(app)
			.get(`/orders/${newId}`)
			.set(headers("admin"))
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.status).toBe(true);
			});
	});
});

describe("ALL UPDATES FUNCTIONS", () => {
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

		const newId = order._id;
		return await request(app)
			.patch(`/orders/${newId}`)
			.set(headers("admin"))
			.send({
				state: 2,
			})
			.then((res) => {
				expect(res.status).toBe(201);
				expect(res.body.status).toBe(true);
				expect(res.body.order.state).toBe(2);
			});
	});
	it("CHECKS WHEN IF USER WITH WRONG ACCESS TRIES TO UPDATE", async () => {
		const fakeId = "633fe83c30d4fcb46f7478de";
		return await request(app)
			.patch(`/orders/${fakeId}`)
			.send({
				state: 3,
			})
			.set(headers("admin"))
			.expect(404)
			.then((res) => {
				expect(res.body.order).toBe(null);
			});
	});
	it("CHECKS IF USER WITH RIGHT ACCESS BUT WRONG ID TRIES TO UPDATE", async () => {
		const fakeId = "633fe83c30d4fcb46f7478de";
		return await request(app)
			.patch(`/orders/${fakeId}`)
			.set(headers("admin"))
			.send({
				state: 2,
			})
			.then((res) => {
				expect(res.status).toBe(404);
				expect(res.body.order).toBe(null);
			});
	});

	it("EXPECTED TO FAIL AS STATE CANNOT BE REVERSED", async () => {
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

		const newId = orders._id;

		return await request(app)
			.patch("/orders/" + newId)
			.send({
				state: 0,
			})
			.set(headers("admin"))
			.expect(422)
			.then((res) => {
				expect(res.body.order).toBe(null);
			});
	});
});

describe("ALL DELETE FUNCTIONS", () => {
	it("DELETES WITH SPECIFIC ID", async () => {
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

		const newId = orders._id;
		return await request(app)
			.delete(`/orders/${newId}`)
			.set(headers("admin"))
			.expect(201)
			.then((res) => {
				expect(res.body.order.deletedCount).toBe(
					1
				);
			});
	});

	it("CHECKS IF USER WITH RIGHT ACCESS BUT WRONG ID TRIES TO DELETE", async () => {
		const fakeId = "633fe83c30d4fcb46f7478de";
		return await request(app)
			.delete(`/orders/${fakeId}`)
			.set(headers("admin"))
			.then((res) => {
				expect(res.status).toBe(201);
				expect(res.body.order.deletedCount).toBe(
					0
				);
			});
	});
});

describe("GETS ALL ORDERS SORTED BY STATE/DATE/PRICE", () => {
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
afterAll(async () => {
	try {
		await mongoose.connection.db.dropDatabase();
		await mongoose.connection.close();
	} catch {
		console.error("Failed to drop database");
	}
});
