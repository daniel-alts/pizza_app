const app = require("../../index");
const mongoose = require('mongoose');
const supertest = require("supertest");
require('dotenv').config()

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
})

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET  /", () => {
  test("it responds with 401 status code", async () => {
    const response = await supertest(app).get("/")
    expect(response.statusCode).toBe(401);
  })

  test("it responds with 200 status code", async () => {
    const response = await supertest(app).get("/").auth("test", "test")
    expect(response.statusCode).toBe(200);
  })

  test("it responds with content-type of json", async () => {
    const response = await supertest(app).get("/");
    expect(response.headers["content-type"].split(";")[0]).toBe("application/json")
  })
});

