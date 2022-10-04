const app = require("../../app");
const { MongoClient } = require("mongodb");

const request = require("supertest");

// beforeAll((done) => {
//   app.listen(done);
//   done();
// });

describe("Route testing", () => {
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

	it("Should respond with a 401 to GET /order for a non-authenticated user", async () => {
		const response = await request(app).get("/order");
		expect(response.status).toEqual(401);
	});


	// it("GET /order => should return an array of objects", async () => {
	// 	const response = await request(app).get("/order");
	// 	expect(response.status).toEqual(200);
	// 	expect(JSON.parse(response.text).length).toBeGreaterThan(0);
	// });

	// it("POST to /user/register should respond with 201", async () => {
	// 	const data = { username: "test", password: "testPassword" };
	// 	await request(app).post("/user/register").send(data).expect(201);
	// });

	// it("should insert a doc into collection", async () => {
	// 	const users = db.collection("users");

	// 	const mockUser = { _id: "some-user-id", name: "John" };
	// 	await users.insertOne(mockUser);

	// 	const insertedUser = await users.findOne({ _id: "some-user-id" });
	// 	expect(insertedUser).toEqual(mockUser);
	// });
});
