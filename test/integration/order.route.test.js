const app = require("../../index");
const mongoose = require('mongoose');
const supertest = require("supertest");
const Order = require("../../orderModel");
require('dotenv').config()

const orderData = {
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

const nonAdminUser = {username: "test", password: "test"}
const AdminUser = {username: "test1", password: "test1", user_type: "admin"}

expect.extend({
  toBeJSON(contentType) {
    const contentTypeData = contentType.split(";")[0];
    if (!contentTypeData) {
      return {
        pass: false,
        message: "Expected Content-Type to be json"
      }
    }
    if (contentTypeData == "application/json")  {
      return {
        pass: true,
        message: `Expected  ${contentTypeData} to be application/json`
      }
    } else {
      return {
        pass: true,
        message: `Expected  ${contentTypeData} to be application/json`
      }
    }
  }
})


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_DB);

  const server = supertest(app)
  await server.post("/users/new").send(nonAdminUser);
  await server.post("/users/new").send(AdminUser);
  await server.post("/order").send(orderData);
})


afterAll(async () => {
  await mongoose.connection.close();
});

describe("Order GET / route ", () => {
  it("responds with 401 status code", async () => {
    const response = await supertest(app).get("/")
    expect(response.statusCode).toBe(401);
  })

  it("responds with 200 status code", async () => {
    const response = await supertest(app).get("/").auth(nonAdminUser.username, nonAdminUser.password)
    expect(response.statusCode).toBe(200);
  })

  it("responds with content-type of json", async () => {
    const response = await supertest(app).get("/");
    expect(response.headers["content-type"]).toBeJSON()
  })
});

describe("Order POST / route", () => {
  it("denies non-admin user permission to add new order", async () => {
    const response = await supertest(app)
      .post("/order").send(orderData).auth(nonAdminUser.username, nonAdminUser.password);
    expect(response.statusCode).toBe(401);

  })

  it("adds order for admin user", async () => {
    const response = await supertest(app)
      .post("/order").auth(AdminUser.username, AdminUser.password).send(orderData);
    expect(response.headers["content-type"]).toBeJSON()
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.state).toBe(1);
    expect(response.body.order.total_price).toBe(300)
  })

})

describe("DELETE /order/:id", () => {
  it("denies non-admin user permission to delete", async () => {
    const itemToDelete = await Order.findOne({test: true});
    const response = await supertest(app).delete(`/order/${itemToDelete._id}`).auth(nonAdminUser.username, nonAdminUser.password)
    expect(response.statusCode).toBe(401);
  })

  it("deletes order for admin user", async () => {
    const itemToDelete = await Order.findOne({test: true});
    const response = await supertest(app).delete(`/order/${itemToDelete._id}`).auth(AdminUser.username, AdminUser.password)
    expect(response.headers["content-type"]).toBeJSON()
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.deletedCount).toBe(1);
  })
})