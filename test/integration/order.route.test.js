const app = require("../../index");
const mongoose = require('mongoose');
const supertest = require("supertest");
const Order = require("../../orderModel");
require('dotenv').config()

const data = {
  "test": true,
  "items": [
  {
    "name": "Test 103",
    "price": 100,
    "size": "m",
    "quantity": 2
  },
  {
    "name": "Test 104",
    "price": 100,
    "size": "l",
    "quantity": 1
  }
  ]
}

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_TEST_DB);
})

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET  /", () => {
  it("responds with 401 status code", async () => {
    const response = await supertest(app).get("/")
    expect(response.statusCode).toBe(401);
  })

  it("responds with 200 status code", async () => {
    const response = await supertest(app).get("/").auth("test", "test")
    expect(response.statusCode).toBe(200);
  })

  it("responds with content-type of json", async () => {
    const response = await supertest(app).get("/");
    expect(response.headers["content-type"].split(";")[0]).toBe("application/json")
  })
});

describe("POST /order", () => {
  it("denies non-admin user permission to add new order", async () => {
    const response = await supertest(app).post("/order").auth("test", "test").send(data);
    expect(response.statusCode).toBe(401);
    expect(response.headers["content-type"].split(";")[0]).toBe("application/json")

  })

  it("adds order for admin user", async () => {
    const response = await supertest(app).post("/order").auth("test1", "test1").send(data);
    expect(response.headers["content-type"].split(";")[0]).toBe("application/json")
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.state).toBe(1);
    expect(response.body.order.total_price).toBe(300)
  })

})

describe("DELETE /order/:id", () => {
  it("denies non-admin user permission to delete", async () => {
    const itemToDelete = await Order.findOne({test: true});
    const response = await supertest(app).delete(`/order/${itemToDelete._id}`).auth("test", "test")
    expect(response.statusCode).toBe(401);
    expect(response.headers["content-type"].split(";")[0]).toBe("application/json")
  })

  it("deletes order for admin user", async () => {
    const itemToDelete = await Order.findOne({test: true});
    const response = await supertest(app).delete(`/order/${itemToDelete._id}`).auth("test1", "test1")
    expect(response.headers["content-type"].split(";")[0]).toBe("application/json")
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.deletedCount).toBe(1);
  })
})