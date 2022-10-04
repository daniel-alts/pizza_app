const app = require("../../app");
const { MongoClient } = require("mongodb");

const request = require("supertest")(app);

describe("test the root path", () => {
	let connection;
	let db;

	beforeAll(async () => {
		connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		db = await connection.db(globalThis.__MONGO_DB_NAME__);
	});

	afterAll(async () => {
		await connection.close();
	});

	it("should insert a doc into collection", async () => {
		const users = db.collection("users");

		const mockUser = { _id: "some-user-id", name: "John" };
		await users.insertOne(mockUser);

		const insertedUser = await users.findOne({ _id: "some-user-id" });
		expect(insertedUser).toEqual(mockUser);

		// it("should response the GET method", async () => {
		// 	const response = await request.get("/");
		// 	expect(response.status).toBe(200);
		// 	// return response;
		// });
	});
});
