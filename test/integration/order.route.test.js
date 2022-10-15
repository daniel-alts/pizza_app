const app = require("../../index");
const mongoose = require('mongoose');
const supertest = require("supertest");
const Order = require("../../orderModel");
const User = require("../../userModel");
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
const adminUser = {username: "testadmin", password: "testadmin", user_type: "admin"}

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

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }
  }



beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_DB);
  await User.create(adminUser);
  await User.create(nonAdminUser);
  await supertest(app).post("/order").send(orderData);
})


afterAll(async () => {
  await removeAllCollections();
  await mongoose.connection.close();
});

describe("Order GET / route ", () => {
  it("responds with 200 status code", async () => {
    const response = await supertest(app).get("/")
    expect(response.statusCode).toBe(200);
  })

  it("responds with content-type of json", async () => {
    const response = await supertest(app).get("/");
    expect(response.headers["content-type"]).toBeJSON()
  })
});

describe("Order POST / route", () => {
  it("denies non-admin user permission to add new order", async () => {
    const loginResponse = await supertest(app).post("/users/login").send(nonAdminUser);
    const response = await supertest(app)
      .post("/order").send(orderData).set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.statusCode).toBe(401);
  })

  it("adds order for admin user", async () => {
    const loginResponse = await supertest(app).post("/users/login").send(adminUser);
    const response = await supertest(app)
      .post("/order").send(orderData).set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.headers["content-type"]).toBeJSON()
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.state).toBe(1);
    expect(response.body.order.total_price).toBe(300)
  })

})

describe("UPDATE /order/:id", () => {
  it("doesn't patch order state with invalid order state", async () => {
    const loginResponse = await supertest(app).post("/users/login").send(adminUser);
    const itemToUpdate = await Order.findOne({test: true});
    const response = await supertest(app).patch(`/order/${itemToUpdate._id}`).send({state: 0}).set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.headers["content-type"]).toBeJSON()
    expect(response.statusCode).toBe(422);
  })

  it("patch order state with valid order state", async () => {
    const loginResponse = await supertest(app).post("/users/login").send(adminUser);
    const itemToUpdate = await Order.findOne({test: true});
    const response = await supertest(app).patch(`/order/${itemToUpdate._id}`).send({state: 2}).set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.headers["content-type"]).toBeJSON()
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.state).toBe(2)
  })
})

describe("DELETE /order/:id", () => {
  it("denies non-admin user permission to delete", async () => {
    const loginResponse = await supertest(app).post("/users/login").send(nonAdminUser);
    const itemToDelete = await Order.findOne({test: true});
    const response = await supertest(app).delete(`/order/${itemToDelete._id}`).set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.statusCode).toBe(401);
  })

  it("deletes order for admin user", async () => {
    const loginResponse = await supertest(app).post("/users/login").send(adminUser);
    const itemToDelete = await Order.findOne({test: true});
    const response = await supertest(app).delete(`/order/${itemToDelete._id}`).set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.headers["content-type"]).toBeJSON()
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.order.deletedCount).toBe(1);
  })
})